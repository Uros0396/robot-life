const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.log("No token provided.");
    return res.status(401).send({
      statusCode: 401,
      message: "Access denied. No token provided.",
    });
  }

  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = decoded;

    if (decoded.role !== "admin") {
      console.log("User is not admin.");
      return res.status(403).send({
        statusCode: 403,
        message: "Access denied. Only admins can access this route.",
      });
    }

    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(400).send({
      statusCode: 400,
      message: "Invalid token.",
    });
  }
};

module.exports = authenticateAdmin;
