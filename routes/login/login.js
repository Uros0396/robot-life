const express = require("express");
const login = express.Router();
const generateToken = require("../../middleware/generateToken/generateToken");
const validatePassword = require("../../middleware/validatePassword/validatePassword");

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
