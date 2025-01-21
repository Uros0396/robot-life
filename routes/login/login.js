/*const express = require("express");
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

module.exports = login;*/

const express = require("express");
const login = express.Router();
const generateToken = require("../../middleware/generateToken/generateToken");
const validatePassword = require("../../middleware/validatePassword/validatePassword");

// Login route
login.post("/login", validatePassword, (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

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
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = login;
