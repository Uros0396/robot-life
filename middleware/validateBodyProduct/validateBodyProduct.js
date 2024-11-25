const validateBodyProduct = (req, res, next) => {
  const errors = [];

  const { asin, title, description, price, stock } = req.body;

  if (typeof asin !== "string") {
    errors.push("Asin must be a string");
  }

  if (typeof title !== "string") {
    errors.push("Title must be a string");
  }

  if (typeof category !== "string") {
    errors.push("category must be a string");
  }

  if (typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    errors.push("Price must be a positive number");
  }

  if (typeof stock === "undefined" || isNaN(stock) || parseInt(stock) < 0) {
    errors.push("Stock must be a non-negative number");
  }

  if (errors.length > 0) {
    return res.status(400).send({
      statusCode: 400,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = validateBodyProduct;
