const express = require("express");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
//const userModel = require("../../models/userModel/userModel");
//const validateLogin = require("../../middleware/validateLogin/validateLogin");
const login = express.Router();
const generateToken = require("../../middleware/generateToken/generateToken");
const validatePassword = require("../../middleware/validatePassword/validatePassword");

/*login.post("/login", validateLogin, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user;
    if (username) {
      user = await userModel.findOne({ username });
    } else if (email) {
      user = await userModel.findOne({ email });
    }

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid password",
      });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "240m",
    });

    res
      .header("Authorization", token)
      .status(200)
      .send({
        statusCode: 200,
        message: "Login successful",
        token: `Bearer ${token}`,
      });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
});*/

login.post("/login", validatePassword, (req, res) => {
  const user = req.user;
  const userToken = generateToken(user);
  res
    .header("Authorization", userToken)
    .status(200)
    .send({
      statusCode: 200,
      message: "You are successfully logged in",
      token: userToken,
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
});

module.exports = login;
