const express = require("express");
const cors = require("cors");
const router = require("./routes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta: http://localhost:${PORT}`);
});
