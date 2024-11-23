const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Ottieni il token dal header

  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "Access denied. No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aggiungi i dati dell'utente (payload) alla richiesta
    next(); // Passa al prossimo middleware/handler
  } catch (error) {
    return res.status(400).send({
      statusCode: 400,
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
