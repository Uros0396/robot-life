const mongoose = require("mongoose");
const allowedGenders = ["M", "F", "L", "G", "T", "not specified"];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },

    surname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: allowedGenders,
      required: false,
      default: "not specified",
    },

    username: {
      type: String,
      required: true,
      minLength: 8,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addressModel",
      },
    ],

    creditCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creditCardModel",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel",
      },
    ],

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartModel",
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);
//routes: users
module.exports = mongoose.model("userModel", UserSchema, "users");