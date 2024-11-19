const express = require("express");
const app = express();
const PORT = 4600;

app.get("/", (req, res) => {
  res.send("Server attivo!");
});

app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
