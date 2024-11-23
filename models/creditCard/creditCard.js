/*const mongoose = require("mongoose");

const CreditCardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model(
  "creditCardModel",
  CreditCardSchema,
  "creditCards"
);*/
