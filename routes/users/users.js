const express = require("express");
const mongoose = require("mongoose");
const usersModel = require("../../models/userModel/userModel");
const users = express.Router();
const validateBodyUser = require("../../middleware/validateBodyUser/validateBodyUser");
const authenticateAdmin = require("../../middleware/authAdminMiddleware/authAdminMiddleware");
const bcrypt = require("bcrypt");

users.get(
  "/users",
  [validateBodyUser, authenticateAdmin],
  async (req, res, next) => {
    try {
      const users = await usersModel.find();
      if (!users) {
        return res.status(404).send({
          statusCode: 404,
          message: "Not Found",
        });
      }

      res.status(200).send({
        statusCode: 200,
        message: "Users Found",
        users,
      });
    } catch (error) {
      next(message.error);
    }
  }
);

users.post(
  "/users/create",
  [validateBodyUser, authenticateAdmin],
  async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new usersModel({
      name: req.body.name,
      surname: req.body.surname,
      dob: new Date(req.body.dob),
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
      username: req.body.username,
    });

    try {
      const user = await newUser.save();
      res.status(201).send({
        statusCode: 201,
        message: "User created successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = users;
