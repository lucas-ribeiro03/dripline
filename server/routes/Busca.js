const express = require("express");
const router = express.Router();
const { Anuncio, Produto } = require("../models");
const { Op } = require("sequelize");

router.get("/:search", async (req, res) => {
  const { search } = req.params;

  const response = await Anuncio.findAll({
    include: [
      {
        model: Produto,
        as: "produto",
        where: {
          nome: {
            [Op.like]: `%${search}%`,
          },
        },
      },
    ],
  });

  return res.json(response);
});

module.exports = router;
