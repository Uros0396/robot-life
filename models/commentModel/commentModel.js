const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
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
