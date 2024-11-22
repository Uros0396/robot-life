const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorized");

  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (decoded.role !== "admin") {
      return res.status(403).send({
        statusCode: 403,
        message: "Access denied. Only admins can access this route.",
      });
    }

    next();
  } catch (error) {
    res.status(400).send({
      statusCode: 400,
      message: "Invalid token.",
    });
  }
};

module.exports = authenticateAdmin;