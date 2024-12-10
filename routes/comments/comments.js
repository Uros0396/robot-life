{
  /*const express = require("express");
const mongoose = require("mongoose");
const comments = express.Router();
const userModel = require("../../models/userModel/userModel");
const productModel = require("../../models/productModel/productModel");
const commentModel = require("../../models/commentModel/commentModel");

comments.get("/comments", async (req, res, next) => {
  try {
    const allComments = await commentModel.find().populate("user product");
    if (allComments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment Not Found",
      });
    }
    res.status(200).send(allComments);
  } catch (error) {
    next(error);
  }
});

comments.get("/comment/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const commentsByProduct = await productModel
      .findById(productId)
      .populate("comments")
      .select("comments");
    res.status(200).send(commentsByProduct);
  } catch (error) {
    next(error);
  }
});

comments.post("/comment/create", async (req, res, next) => {
  const { rate, user: userId, product: productId, comment } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    const product = await productModel.findOne({ _id: productId });

    if (!user || !product) {
      return res.status(404).send({ message: "User or Product not found" });
    }

    const newComment = new commentModel({
      comment,
      rate,
      user: user._id,
      product: product._id,
    });
    const savedComment = await newComment.save();

    await productModel.updateOne(
      { _id: product._id },
      { $push: { comments: savedComment._id } }
    );

    await userModel.updateOne(
      { _id: user._id },
      { $push: { comments: savedComment._id } }
    );

    res.status(201).send(savedComment);
  } catch (error) {
    next(error);
  }
});

comments.put("/comment/:id", async (req, res, next) => {
  const { comment, rate } = req.body;

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      {
        comment,
        rate: mongoose.Types.Decimal128.fromString(rate.toString()),
      },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.status(200).send(updatedComment);
  } catch (error) {
    next(error);
  }
});

comments.patch("/comment/:id", async (req, res, next) => {
  const { comment, rate } = req.body;

  try {
    const updateFields = {};
    if (comment) updateFields.comment = comment;
    if (rate)
      updateFields.rate = mongoose.Types.Decimal128.fromString(rate.toString());

    const patchedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!patchedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.status(200).send(patchedComment);
  } catch (error) {
    next(error);
  }
});

comments.delete("/comment/:id", async (req, res, next) => {
  try {
    const deletedComment = await commentModel.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    await productModel.updateOne(
      { _id: deletedComment.product },
      { $pull: { comment: deletedComment._id } }
    );

    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = comments;*/
}

const express = require("express");
const mongoose = require("mongoose");
const comments = express.Router();
const userModel = require("../../models/userModel/userModel");
const productModel = require("../../models/productModel/productModel");
const commentModel = require("../../models/commentModel/commentModel");

comments.get("/comments", async (req, res, next) => {
  try {
    const allComments = await commentModel.find().populate("user product");
    if (allComments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment Not Found",
      });
    }
    res.status(200).send(allComments);
  } catch (error) {
    next(error);
  }
});

comments.get("/comment/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const commentsByProduct = await productModel
      .findById(productId)
      .populate("comments")
      .select("comments");
    res.status(200).send(commentsByProduct);
  } catch (error) {
    next(error);
  }
});

comments.post("/comment/create", async (req, res, next) => {
  const { rate, user: userId, product: productId, comment } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    const product = await productModel.findOne({ _id: productId });

    if (!user || !product) {
      return res.status(404).send({ message: "User or Product not found" });
    }

    const newComment = new commentModel({
      comment,
      rate,
      user: user._id,
      product: product._id,
    });
    const savedComment = await newComment.save();

    await productModel.updateOne(
      { _id: product._id },
      { $push: { comments: savedComment._id } }
    );

    await userModel.updateOne(
      { _id: user._id },
      { $push: { comments: savedComment._id } }
    );

    res.status(201).send(savedComment);
  } catch (error) {
    next(error);
  }
});

comments.put("/comment/:id", async (req, res, next) => {
  const { comment, rate } = req.body;

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      {
        comment,
        rate: mongoose.Types.Decimal128.fromString(rate.toString()),
      },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.status(200).send(updatedComment);
  } catch (error) {
    next(error);
  }
});

comments.patch("/comment/:id", async (req, res, next) => {
  const { comment, rate } = req.body;

  try {
    const updateFields = {};
    if (comment) updateFields.comment = comment;
    if (rate)
      updateFields.rate = mongoose.Types.Decimal128.fromString(rate.toString());

    const patchedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!patchedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.status(200).send(patchedComment);
  } catch (error) {
    next(error);
  }
});

comments.delete("/comment/:id", async (req, res, next) => {
  try {
    const deletedComment = await commentModel.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    await productModel.updateOne(
      { _id: deletedComment.product },
      { $pull: { comment: deletedComment._id } }
    );

    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = comments;
