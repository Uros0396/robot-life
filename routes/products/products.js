const express = require("express");
const mongoose = require("mongoose");
const productModel = require("../../models/productModel/productModel");
const products = express.Router();
const validateBodyProduct = require("../../middleware/validateBodyProduct/validateBodyProduct");
const authenticateAdmin = require("../../middleware/authAdminMiddleware/authAdminMiddleware");

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

products.post(
  "/products/create",
  [validateBodyProduct, authenticateAdmin],
  async (req, res) => {
    console.log("Received request to create product:", req.body);
    try {
      const { asin, title, image, description, price, stock } = req.body;

      // Qui puoi accedere a req.user per ottenere i dati dell'admin (incluso il suo ID)
      const adminId = req.user.id; // ID dell'admin dal token
      console.log("Product Data:", {
        asin,
        title,
        image,
        description,
        price,
        stock,
      });
      console.log("Admin ID:", adminId);

      // Creazione del prodotto
      const newProduct = new productModel({
        asin,
        title,
        image,
        description,
        price: mongoose.Types.Decimal128.fromString(price.toString()),
        stock: mongoose.Types.Decimal128.fromString(stock.toString()),
        createdBy: adminId, // Puoi anche associare l'ID dell'admin al prodotto (facoltativo)
      });

      const savedProduct = await newProduct.save();

      res.status(201).send({
        statusCode: 201,
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  }
);

products.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        asin: req.body.asin,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error updating product",
    });
  }
});

products.patch("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error updating product",
    });
  }
});

products.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).send({
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error deleting product",
    });
  }
});

module.exports = products;

/*Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDFjNTFlYmUxNzdlNzZjMzQ0OTk4YiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjM4MTIzMywiZXhwIjoxNzMyMzk1NjMzfQ.p6wr-UyVmSLPKgXPcWpdOwQvrsqELif5pjnKG_6Mj6Y*/
