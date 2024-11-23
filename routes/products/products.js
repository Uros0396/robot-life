const express = require("express");
const mongoose = require("mongoose");
const productModel = require("../../models/productModel/productModel");

const products = express.Router();

products.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(404).send({
        statusCode: 404,
        message: "Not Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Products Found",
      products,
    });
  } catch (error) {
    console.log(error);
  }
});

products.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "Not Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Products Found",
      product,
    });
  } catch (error) {
    console.log(error);
  }
});

products.get("/products/title/:title", async (req, res) => {
  try {
    const product = await productModel.findOne({ title: req.params.title });
    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "Not Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
  }
});

products.post("/products/create", async (req, res) => {
  const newProduct = new productModel({
    asin: req.body.asin,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  });

  try {
    const product = await newProduct.save();
    res.status(201).send({
      statusCode: 201,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error while saving product:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error saving product",
    });
  }
});

module.exports = products;
