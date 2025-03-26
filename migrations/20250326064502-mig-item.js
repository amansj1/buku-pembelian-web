"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item", {
      id_item: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      no_item: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_item: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      satuan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ket: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("item");
  },
};
