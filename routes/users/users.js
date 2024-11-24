const express = require("express");
const bcrypt = require("bcrypt");
const usersModel = require("../../models/userModel/userModel");
const users = express.Router();
const validateBodyUser = require("../../middleware/validateBodyUser/validateBodyUser");

users.get("/users", async (req, res, next) => {
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
    next(error);
  }
});

users.post("/users/create", validateBodyUser, async (req, res, next) => {
  const { name, surname, dob, username, email, password, role, address } =
    req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new usersModel({
      name,
      surname,
      dob,
      username,
      email,
      password: hashedPassword,
      role,
      address,
    });

    const savedUser = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
});

users.put("/users/:id", validateBodyUser, async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userData = {
    name: req.body.name,
    surname: req.body.surname,
    dob: new Date(req.body.dob),
    email: req.body.email,
    address: req.body.address,
    role: req.body.role,
    password: hashedPassword,
    username: req.body.username,
  };

  try {
    const replacedUser = await usersModel.findByIdAndUpdate(
      req.params.id,
      userData,
      { new: true, overwrite: true, runValidators: true }
    );

    if (!replacedUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User replaced successfully",
      user: replacedUser,
    });
  } catch (error) {
    next(error);
  }
});

users.patch("/users/:id", async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

users.delete("/users/:id", async (req, res, next) => {
  try {
    const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = users;
