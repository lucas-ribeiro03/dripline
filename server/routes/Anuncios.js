const express = require("express");
const router = express.Router();
const { Anuncio, Produto } = require("../models");

router.get("/:id", async (req, res) => {
  console.log("EXECUTADO");
  const { id } = req.params;
  const response = await Anuncio.findOne({
    where: { produto_id: id },
  });
  return res.json(response);
});

module.exports = router;
