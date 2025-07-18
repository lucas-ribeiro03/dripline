require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const db = require("./models");

const produtosRoutes = require("./routes/Produtos");
const anuncioRoutes = require("./routes/Anuncios");

app.use(cors());
app.use(express.json());
app.use("/img", express.static("public/img"));
app.use("/produtos", produtosRoutes);
app.use("/anuncio", anuncioRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, {});
});
