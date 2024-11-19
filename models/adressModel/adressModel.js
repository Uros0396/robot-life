const mongoose = require("mongoose");

const AdressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    postalCode: {
      type: String,
      required: true,
    },

    country: {
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

module.exports = mongoose.model("adressModel", AdressSchema, "adress");
