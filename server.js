const express = require("express");
const dotenv = require("dotenv");
const init = require("./db");
const userRoute = require("./routes/users/users");
const loginRoute = require("./routes/login/login");
const productRoute = require("./routes/products/products");
const errorHandler = require("./middleware/errorHandler/errorHandler");

dotenv.config();

const PORT = process.env.PORT || 4600;
const server = express();

server.use(express.json());

server.use("/", userRoute);

server.use("/", loginRoute);

server.use("/", productRoute);

server.use(errorHandler);

init();
server.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
