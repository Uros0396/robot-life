const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send({
      statusCode: 403,
      message: "Access denied. Admin only",
    });
  }

  next();
};

module.exports = adminMiddleware;
