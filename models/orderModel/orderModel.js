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
