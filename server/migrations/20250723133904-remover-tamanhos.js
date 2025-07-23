"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("anuncios", "tamanho_roupa");

    await queryInterface.removeColumn("anuncios", "tamanho_tenis");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("anuncios", "tamanho_tenis", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
