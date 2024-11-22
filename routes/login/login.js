const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel/userModel");
const login = express.Router();
const validateLogin = require("../../middleware/validateLogin/validateLogin");

login.post("/login", validateLogin, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid password",
      });
    }

    const payload = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "240m",
    });

    res
      .header("Authorization", token)
      .status(200)
      .send({
        statusCode: 200,
        token,
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
          _id: user._id,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = login;
