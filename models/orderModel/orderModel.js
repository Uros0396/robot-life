const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: false,
    },
    items: [
      {
        products: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "productModel",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
            price: {
              type: mongoose.Types.Decimal128,
              required: true,
            },
          },
        ],
        subTotal: {
          type: mongoose.Types.Decimal128,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    paymentId: {
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
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
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
