const express = require("express");
const init = require("./db");
const PORT = 4600;
const server = express();

//middleware
server.use(express.json());

init();
server.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
