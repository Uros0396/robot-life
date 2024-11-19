const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
      },
    ],

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("stockModel", StockSchema, "stock");
