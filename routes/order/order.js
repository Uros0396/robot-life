const express = require("express");
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
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

module.exports = order;
