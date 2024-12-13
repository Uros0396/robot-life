const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: mongoose.Types.Decimal128,
          required: true,
        },
      },
    ],

    shippingAddress: {
      street: {
        type: String,
        required: true,
      },

      houseNumber: {
        type: Number,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      CAP: {
        type: Number,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },

    stripePaymentId: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderModel", OrderSchema, "orders");

/*const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
const productModel = require("../../models/productModel/productModel");
require("dotenv").config();
const order = express.Router();

order.post("/order", async (req, res) => {
  const { user, items, shippingAddress } = req.body;

  try {
    const totalPrice = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
      metadata: { user, items: JSON.stringify(items) },
    });

    const newOrder = new orderModel({
      user: user,
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
              `Non c'è abbastanza stock per il prodotto ${product.title}`
            );
          }

          return productModel.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } }
          );
        } else {
          throw new Error(`Prodotto con ID ${item.product} non trovato`);
        }
      });
    });

    await stockUpdatePromises.reduce(
      async (previousPromise, currentPromise) => {
        await previousPromise;
        return currentPromise;
      },
      Promise.resolve()
    );

    res.status(201).send({
      message: "Ordine creato, pronto per il pagamento",
      clientSecret: paymentIntent.client_secret,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Errore durante la creazione dell'ordine:", error);
    res.status(500).send({ message: "Errore del server" });
  }
});

module.exports = order;*/
