const express = require("express");
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
const productModel = require("../../models/productModel/productModel");
require("dotenv").config();
const order = express.Router();

order.post("/order", async (req, res) => {
  const { user, items, shippingAddress } = req.body;

  if (!user || !items || !shippingAddress) {
    return res
      .status(400)
      .send({ message: "Missing data in the request body" });
  }

  const missingItems = items.filter(
    (item) => !item.product || !item.quantity || !item.price
  );
  if (missingItems.length > 0) {
    return res
      .status(400)
      .send({ message: "Incomplete product data for some items" });
  }

  const { street, houseNumber, city, CAP, country } = shippingAddress;
  if (!street || !houseNumber || !city || !CAP || !country) {
    return res.status(400).send({ message: "Incomplete shipping address" });
  }

  try {
    const totalPrice = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    console.log("Total Price:", totalPrice);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
      metadata: { user, items: JSON.stringify(items) },
    });
    console.log("PaymentIntent created:", paymentIntent);

    const newOrder = new orderModel({
      user,
      items,
      shippingAddress,
      totalPrice,
      stripePaymentId: paymentIntent.id,
    });

    const savedOrder = await newOrder.save();

    const stockUpdatePromises = items.map((item) => {
      return productModel.findById(item.product).then((product) => {
        if (product) {
          if (product.stock < item.quantity) {
            throw new Error(
              `Not enough stock for the product ${product.title}`
            );
          }

          return productModel.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } }
          );
        } else {
          throw new Error(`Product with ID ${item.product} not found`);
        }
      });
    });

    await Promise.all(stockUpdatePromises);

    res.status(201).send({
      message: "Order created, ready for payment",
      clientSecret: paymentIntent.client_secret,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating the order:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = order;
