const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
      default: "https://placehold.co/600x400",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
    },

    stock: {
      type: mongoose.Types.Decimal128,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("productModel", ProductSchema, "products");
