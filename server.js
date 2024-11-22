const express = require("express");
const dotenv = require("dotenv");
const init = require("./db");
const userRoute = require("./routes/users/users");
const loginRoute = require("./routes/login/login");

dotenv.config();

const PORT = process.env.PORT || 4600;
const server = express();

server.use(express.json());

server.use("/", userRoute);

server.use("/", loginRoute);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

init();
server.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
