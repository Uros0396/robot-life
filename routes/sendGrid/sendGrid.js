const express = require("express");
const email = express.Router();
const sgMail = require("@sendgrid/mail");
const validator = require("validator");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let messages = [];

email.post("/email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Missing required field",
      });
    }

    if (!validator.isEmail(to)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid recipient email address",
      });
    }

    const msgEmail = {
      to,
      from: process.env.SENDER_EMAIL,
      subject,
      text,
    };

    await sgMail.send(msgEmail);

    messages.push(msgEmail);

    res.status(200).json({
      statusCode: 200,
      message: "Email inviata con successo",
      msgEmail,
    });
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Errore nell'invio dell'email. Riprova più tardi.",
    });
  }
});

email.get("/messages", async (req, res) => {
  try {
    res.status(200).json(messages);
  } catch (error) {
    console.error("Errore nel recupero dei messaggi:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Errore nel recupero dei messaggi.",
    });
  }
});

email.use((err, req, res, next) => {
  console.error("Errore generico:", err);
  res.status(500).json({
    statusCode: 500,
    message: "Errore interno del server.",
  });
});

module.exports = email;
