const express = require("express");
const mongoose = require("mongoose");
const productModel = require("../../models/productModel/productModel");
const cloud = require("../../middleware/cloudinaryMiddleware/cloudinary");
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

products.get("/products/pagination", async (req, res) => {
  const { page = 1, pageSize = 4 } = req.query;
  try {
    const products = await productModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const count = await productModel.countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    if (!products) {
      return res.status(404).send({
        statusCode: 404,
        message: "Not Found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Products Found: ${products.length}`,
      products,
      count,
      totalPages,
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
  const { title } = req.params;

  if (!title) {
    return res.status(400).send({
      statusCode: 400,
      message: "Title is required",
    });
  }

  try {
    const products = await productModel.find({
      title: {
        $regex: title,
        $options: "i",
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Title not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Products Found: ${products.length}`,
      products,
    });
  } catch (error) {
    console.error("Error while searching products:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

products.post(
  "/products/create",
  [validateBodyProduct, authenticateAdmin],
  async (req, res) => {
    console.log("Received request to create product:", req.body);
    try {
      const { asin, title, image, description, category, price, stock } =
        req.body;
      console.log("Category Type:", typeof category);

      const adminId = req.user.id;
      console.log("Product Data:", {
        asin,
        title,
        image,
        description,
        category,
        price,
        stock,
      });
      console.log("Admin ID:", adminId);

      const newProduct = new productModel({
        asin,
        title,
        image,
        description,
        category,
        price: mongoose.Types.Decimal128.fromString(price.toString()),
        stock: mongoose.Types.Decimal128.fromString(stock.toString()),
        createdBy: adminId,
      });

      const savedProduct = await newProduct.save();

      const productId = savedProduct._id;

      await productModel.updateOne({ _id: productId }, { $inc: { stock: -1 } });

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

products.put("/products/updatePut/:id", async (req, res) => {
  const { asin, title, image, description, category, price, stock } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        asin,
        title,
        image,
        description,
        category,
        price: mongoose.Types.Decimal128.fromString(price.toString()),
        stock: mongoose.Types.Decimal128.fromString(stock.toString()),
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

products.patch("/products/updatePatch/:id", async (req, res) => {
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

products.delete("/products/delete/:id", async (req, res) => {
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

products.post(
  "/products/upload/cloud",
  cloud.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Not uploaded file",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "Uploaded successfully",
        file: {
          url: req.file.path,
          public_id: req.file.filename,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = products;
