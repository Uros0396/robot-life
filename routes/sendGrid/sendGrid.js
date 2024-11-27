const express = require("express");
const email = express.Router();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

email.post("/email", async (req, res, next) => {
  const { to, subject, text, html } = req.body;
  try {
    if (!to || !subject || (!text && !html)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Missing required field",
      });
    }
    const msgEmail = {
      to,
      from: process.env.SENDER_EMAIL,
      subject,
      text,
      html,
    };
    await sgMail.send(msgEmail);
    res.status(200).send({
      statusCode: 200,
      message: "Email Send",
      msgEmail,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = email;
