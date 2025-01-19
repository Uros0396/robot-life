const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
const productModel = require("../../models/productModel/productModel");
const userModel = require("../../models/userModel/userModel");
require("dotenv").config();

const order = express.Router();

order.post("/order", async (req, res, next) => {
  const { user, items, shippingAddress } = req.body;

  try {
    const totalAmount = items.reduce(
      (acc, item) =>
        acc +
        item.products.reduce(
          (subAcc, product) =>
            subAcc + parseFloat(product.price) * product.quantity,
          0
        ),
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "eur",
      payment_method_types: ["card"],
    });

    const stockUpdates = items.reduce((acc, item) => {
      const itemUpdates = item.products.map(async (product) => {
        const productId = product.product;
        const quantity = product.quantity;

        if (!productId || !quantity || !product.price) {
          throw new Error(`Invalid price or quantity for product ${productId}`);
        }

        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        if (existingProduct.stock < quantity) {
          throw new Error(
            `Product ${existingProduct.name} is no longer available or stock is insufficient`
          );
        }

        const updateResult = await productModel.updateOne(
          { _id: productId },
          { $inc: { stock: -quantity } }
        );

        if (updateResult.matchedCount === 0) {
          throw new Error(
            `Failed to update stock for product with ID: ${productId}`
          );
        }
      });

      return acc.concat(itemUpdates);
    }, []);

    await Promise.all(stockUpdates);

    const newOrder = new orderModel({
      user: user || null,
      items,
      totalAmount,
      paymentId: paymentIntent.id,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        user,
        { $push: { orders: savedOrder._id } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send({
          statusCode: 404,
          message: "User not found, but order has been created",
          order: savedOrder,
        });
      }
    }

    res.status(201).send({
      statusCode: 201,
      message: "Order created successfully",
      order: savedOrder,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    if (error.message.includes("no longer available")) {
      return res.status(400).send({
        statusCode: 400,
        message: error.message,
      });
    }
    next(error);
  }
});

module.exports = order;
