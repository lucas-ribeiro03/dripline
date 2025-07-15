const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define("Produto", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    preco_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img_principal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img_secundaria: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    tipo_produto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Produto.associate = (models) => {
    Produto.hasMany(models.Anuncio, {
      foreignKey: "produto_id",
      as: "produto",
    });

    Produto.belongsTo(models.Categoria, {
      foreignKey: "categoria_id",
      as: "categoria",
    });
  };

  return Produto;
};
