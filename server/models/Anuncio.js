const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Anuncio = sequelize.define("Anuncio", {
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Anuncio.associate = (models) => {
    Anuncio.belongsTo(models.Produto, {
      foreignKey: "produto_id",
      as: "produto",
    });
  };

  return Anuncio;
};
