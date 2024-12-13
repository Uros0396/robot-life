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
    console.log("Total Price:", totalPrice);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
      metadata: { user, items: JSON.stringify(items) },
    });
    console.log("PaymentIntent created:", paymentIntent);

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
    console.error("Errore durante la creazione dell'ordine:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).send({ message: "Errore del server" });
  }
});

module.exports = order;


const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
const productModel = require("../../models/productModel/productModel");
require("dotenv").config();
const order = express.Router();

order.post("/order", async (req, res) => {
  const { user, items, shippingAddress } = req.body;

  try {
    // Calcola il totale dell'ordine
    const totalPrice = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    console.log("Total Price:", totalPrice);

    // Creazione del PaymentIntent con metadati ridotti
    const metadata = items.map((item) => ({
      productId: item._id, // Usa solo ID prodotto
      quantity: item.quantity, // Usa solo la quantità
    }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Amount in centesimi
      currency: "usd",
      metadata: { user, items: JSON.stringify(metadata) }, // Passa metadati ridotti
    });
    console.log("PaymentIntent created:", paymentIntent);

    // Crea un nuovo ordine
    const newOrder = new orderModel({
      user: user,
      items,
      shippingAddress,
      totalPrice,
      stripePaymentId: paymentIntent.id,
    });

    // Salva l'ordine nel database
    const savedOrder = await newOrder.save();

    // Aggiorna la disponibilità degli articoli in stock
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

    // Aspetta che tutte le operazioni di aggiornamento dello stock siano completate
    await stockUpdatePromises.reduce(
      async (previousPromise, currentPromise) => {
        await previousPromise;
        return currentPromise;
      },
      Promise.resolve()
    );

    // Rispondi al client con il risultato
    res.status(201).send({
      message: "Ordine creato, pronto per il pagamento",
      clientSecret: paymentIntent.client_secret,
      order: savedOrder,
    });
  } catch (error) {
    // Gestisci l'errore
    console.error("Errore durante la creazione dell'ordine:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).send({ message: "Errore del server" });
  }
});

module.exports = order;*/

const express = require("express");
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);
const orderModel = require("../../models/orderModel/orderModel");
const productModel = require("../../models/productModel/productModel");
require("dotenv").config();
const order = express.Router();

order.post("/order", async (req, res) => {
  const { user, items, shippingAddress } = req.body;

  // Verifica che i campi obbligatori siano presenti
  if (!user || !items || !shippingAddress) {
    return res
      .status(400)
      .send({ message: "Dati mancanti nel corpo della richiesta" });
  }

  // Verifica che gli item abbiano un prodotto e quantità validi
  const missingItems = items.filter(
    (item) => !item.product || !item.quantity || !item.price
  );
  if (missingItems.length > 0) {
    return res
      .status(400)
      .send({ message: "Dati prodotti incompleti per alcuni articoli" });
  }

  // Verifica che l'indirizzo di spedizione contenga tutte le informazioni richieste
  const { street, houseNumber, city, CAP, country } = shippingAddress;
  if (!street || !houseNumber || !city || !CAP || !country) {
    return res
      .status(400)
      .send({ message: "Indirizzo di spedizione incompleto" });
  }

  try {
    // Calcola il totale del prezzo
    const totalPrice = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    console.log("Total Price:", totalPrice);

    // Crea il PaymentIntent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Converti in centesimi
      currency: "usd",
      metadata: { user, items: JSON.stringify(items) },
    });
    console.log("PaymentIntent created:", paymentIntent);

    // Crea un nuovo ordine
    const newOrder = new orderModel({
      user,
      items,
      shippingAddress,
      totalPrice,
      stripePaymentId: paymentIntent.id,
    });

    const savedOrder = await newOrder.save();

    // Aggiorna lo stock dei prodotti
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

    await Promise.all(stockUpdatePromises);

    // Risposta al cliente con il client secret per il pagamento
    res.status(201).send({
      message: "Ordine creato, pronto per il pagamento",
      clientSecret: paymentIntent.client_secret,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Errore durante la creazione dell'ordine:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).send({ message: "Errore del server" });
  }
});

module.exports = order;
