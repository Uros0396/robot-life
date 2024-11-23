/*const express = require("express");
const mongoose = require("mongoose");
const usersModel = require("../../models/userModel/userModel");
const users = express.Router();
const validateBodyUser = require("../../middleware/validateBodyUser/validateBodyUser");

const bcrypt = require("bcrypt");

users.get("/users", validateBodyUser, async (req, res, next) => {
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
});

users.get("/users/:id", validateBodyUser, async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User found",
      user,
    });
  } catch (error) {
    next(error);
  }
});

users.get(
  "/users/username/:username",
  validateBodyUser,
  async (req, res, next) => {
    try {
      const user = await usersModel.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).send({
          statusCode: 404,
          message: "User not found",
        });
      }

      res.status(200).send({
        statusCode: 200,
        message: "User found",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

users.post("/users/create", validateBodyUser, async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new usersModel({
    name: req.body.name,
    surname: req.body.surname,
    dob: new Date(req.body.dob),
    email: req.body.email,
    address: req.body.address,
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
});

users.patch("/users/:id", validateBodyUser, async (req, res, next) => {
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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

users.delete("/users/:id", validateBodyUser, async (req, res, next) => {
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

module.exports = users;*/

const express = require("express");
const bcrypt = require("bcrypt");
const usersModel = require("../../models/userModel/userModel");
const users = express.Router();
const validateBodyUser = require("../../middleware/validateBodyUser/validateBodyUser");

// Recupera tutti gli utenti (solo per admin)
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

// Registrazione utente (gli utenti si registrano con ruolo "user" di default)
/*users.post("/users/register", async (req, res, next) => {
  try {
    const { name, surname, email, password, username } = req.body;

    // Controlla se l'utente esiste già
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        statusCode: 400,
        message: "User already exists",
      });
    }

    // Crittografia della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creazione del nuovo utente con ruolo "user" di default
    const newUser = new usersModel({
      name,
      surname,
      email,
      password: hashedPassword,
      role: "user", // Ruolo di default
      username,
    });

    const savedUser = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User registered successfully",
      user: {
        name: savedUser.name,
        surname: savedUser.surname,
        email: savedUser.email,
        username: savedUser.username,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    next(error);
  }
});*/

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
      role, // Imposta il ruolo come "admin" se desiderato
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
