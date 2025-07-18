const express = require("express");
const router = express.Router();
const { Anuncio, Produto } = require("../models");

router.get("/", async (req, res) => {
  const response = await Produto.findAll();
  return res.json(response);
});

module.exports = router;
