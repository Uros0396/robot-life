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
      message: "Email sent successfully",
      msgEmail,
    });
  } catch (error) {
    console.error("Error send email:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error sending the email. Please try again later.",
    });
  }
});

email.get("/messages", async (req, res) => {
  try {
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving the messages:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Error retrieving the messages.",
    });
  }
});

email.use((err, req, res, next) => {
  console.error("General error:", err);
  res.status(500).json({
    statusCode: 500,
    message: "Server error.",
  });
});

module.exports = email;
