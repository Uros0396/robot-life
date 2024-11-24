const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("commentModel", CommentSchema, "comments");
