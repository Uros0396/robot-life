/*const authenticateAdmin = (req, res, next) => {
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

module.exports = authenticateAdmin;*/

/*const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "Authorization required",
    });
  }

  // Rimuovi il prefisso "Bearer" dal token
  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        statusCode: 403,
        message: "Forbidden",
      });
    }

    // Verifica se l'utente è un admin
    if (decoded.role !== "admin") {
      return res.status(403).send({
        statusCode: 403,
        message: "Access denied. Admins only.",
      });
    }

    // Se il ruolo è admin, prosegui con la rotta
    req.user = decoded; // Aggiunge i dati dell'utente (incluso id e ruolo) a req.user
    next();
  });
};

module.exports = authenticateAdmin;*/

/*const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Imposta i dati dell'utente nel request
    next();
  } catch (err) {
    return res.status(400).send({
      statusCode: 400,
      message: "Invalid token",
    });
  }
};

module.exports = authenticateAdmin;*/

const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Estrai il token dopo "Bearer"
  if (!token) {
    return res.status(401).send({
      statusCode: 401,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica il token

    if (decoded.role !== "admin") {
      return res.status(403).send({
        statusCode: 403,
        message: "Access denied. Admins only.",
      });
    }

    req.user = decoded; // Salva il payload decodificato in req.user
    next(); // Passa al middleware successivo
  } catch (error) {
    res.status(400).send({
      statusCode: 400,
      message: "Invalid token.",
    });
  }
};

module.exports = authenticateAdmin;
