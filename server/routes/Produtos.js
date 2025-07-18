const express = require("express");
const router = express.Router();
const { Categoria, Produto } = require("../models");

router.get("/", async (req, res) => {
  const response = await Produto.findAll({
    include: [{ model: Categoria, as: "categoria" }],
  });
  return res.json(response);
});

module.exports = router;
