const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Produto, {
      foreignKey: "categoria_id",
      as: "categoria",
    });
  };

  return Categoria;
};
