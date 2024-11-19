const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
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

    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartModel",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("productModel", ProductSchema, "products");
