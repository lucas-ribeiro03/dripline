"use strict";

const { QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Produtos", "categoria_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Categoria",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await QueryInterface.removeColumn("Produtos", "categoria_id");
  },
};
