const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("orderModel", OrderSchema, "order");
