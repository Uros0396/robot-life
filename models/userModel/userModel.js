const mongoose = require("mongoose");

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

    address: {
      type: String,
      required: false,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("userModel", UserSchema, "users");
