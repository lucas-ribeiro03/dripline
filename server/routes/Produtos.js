const express = require("express");
const router = express.Router();
const { Categoria, Produto } = require("../models");

router.get("/", async (req, res) => {
  const response = await Produto.findAll({
    include: [{ model: Categoria, as: "categoria" }],
  });
  return res.json(response);
});

router.get("/:id", async (req, res) => {
  const id = req.params;
  const produto = await Produto.findOne({ where: id });
  return res.json(produto);
});

module.exports = router;
