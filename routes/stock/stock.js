/*const express = require("express");
const mongoose = require("mongoose");
const stockModel = require("../../models/stockModel/stockModel");
const stock = express.Router();

stock.get("/stock", async (req, res) => {
  try {
    const stockItems = await stockModel.find().populate("product");
    res.status(200).send({
      statusCode: 200,
      message: "Stock retrieved successfully",
      stockItems,
    });
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error retrieving stock",
    });
  }
});

stock.get("/stock/:id", async (req, res) => {
  try {
    const stockItem = await stockModel
      .findById(req.params.id)
      .populate("product");
    if (!stockItem) {
      return res.status(404).send({
        statusCode: 404,
        message: "Stock item not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Stock item found",
      stockItem,
    });
  } catch (error) {
    console.error("Error fetching stock item:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error retrieving stock item",
    });
  }
});

stock.post("/stock/create", async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const newStockItem = new stockModel({ product, quantity });
    const savedStockItem = await newStockItem.save();
    res.status(201).send({
      statusCode: 201,
      message: "Stock item created successfully",
      stockItem: savedStockItem,
    });
  } catch (error) {
    console.error("Error creating stock item:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error creating stock item",
    });
  }
});

stock.put("/stock/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedStockItem = await stockModel.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!updatedStockItem) {
      return res.status(404).send({
        statusCode: 404,
        message: "Stock item not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Stock item updated successfully",
      stockItem: updatedStockItem,
    });
  } catch (error) {
    console.error("Error updating stock item:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error updating stock item",
    });
  }
});

stock.patch("/stock/:id", async (req, res) => {
  try {
    const updatedStock = await stockModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedStock) {
      return res.status(404).send({
        statusCode: 404,
        message: "Stock not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Stock updated successfully",
      updatedStock,
    });
  } catch (error) {
    console.error("Error updating stock:", error);

    res.status(500).send({
      statusCode: 500,
      message: "Error updating stock",
    });
  }
});

stock.delete("/stock/:id", async (req, res) => {
  try {
    const deletedStockItem = await stockModel.findByIdAndDelete(req.params.id);
    if (!deletedStockItem) {
      return res.status(404).send({
        statusCode: 404,
        message: "Stock item not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Stock item deleted successfully",
      stockItem: deletedStockItem,
    });
  } catch (error) {
    console.error("Error deleting stock item:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error deleting stock item",
    });
  }
});

module.exports = stock;*/
