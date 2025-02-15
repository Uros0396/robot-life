const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const init = require("./db");
const Stripe = require("stripe");
const userRoute = require("./routes/users/users");
const loginRoute = require("./routes/login/login");
const productRoute = require("./routes/products/products");
const commentRoute = require("./routes/comments/comments");
const orderRoute = require("./routes/order/order");
const emailRoute = require("./routes/sendGrid/sendGrid");
const googleRoute = require("./routes/google/google");
const errorHandler = require("./middleware/errorHandler/errorHandler");

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
