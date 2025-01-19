/*const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const init = require("./db");
const userRoute = require("./routes/users/users");
const loginRoute = require("./routes/login/login");
const productRoute = require("./routes/products/products");
const commentRoute = require("./routes/comments/comments");
const orderRoute = require("./routes/order/order");
const emailRoute = require("./routes/sendGrid/sendGrid");
const googleRoute = require("./routes/google/google");
const errorHandler = require("./middleware/errorHandler/errorHandler");

dotenv.config();

const PORT = process.env.PORT || 4600;
const server = express();

server.use(express.json());

server.use(cors());

server.use("/", userRoute);

server.use("/", loginRoute);

server.use("/", productRoute);

server.use("/", commentRoute);

server.use("/", orderRoute);

server.use("/", emailRoute);

server.use("/", googleRoute);

server.use(errorHandler);

init();
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));*/
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const init = require("./db");
const Stripe = require("stripe"); // Aggiungi Stripe
const userRoute = require("./routes/users/users");
const loginRoute = require("./routes/login/login");
const productRoute = require("./routes/products/products");
const commentRoute = require("./routes/comments/comments");
const orderRoute = require("./routes/order/order");
const emailRoute = require("./routes/sendGrid/sendGrid");
const googleRoute = require("./routes/google/google");
const errorHandler = require("./middleware/errorHandler/errorHandler");

dotenv.config();

// Inizializza Stripe con la tua chiave segreta
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 4600;
const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Le tue rotte
server.use("/", userRoute);
server.use("/", loginRoute);
server.use("/", productRoute);
server.use("/", commentRoute);
server.use("/", orderRoute);
server.use("/", emailRoute);
server.use("/", googleRoute);

// Middleware per gestire gli errori
server.use(errorHandler);

// Connessione al database
init();

// Avvio del server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
