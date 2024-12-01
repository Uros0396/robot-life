const mongoose = require("mongoose");
const allowedCategory = [
  "All",
  "Accessories",
  "Robot For House",
  "Robot For Medicine",
  "Humanoid Robots",
  "Cyber-Dogs",
  "Robot Exoskeletons",
  "Drones",
];

const ProductSchema = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
        required: false,
        default: "https://placehold.co/600x400",
      },
    ],

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: allowedCategory,
      required: true,
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
