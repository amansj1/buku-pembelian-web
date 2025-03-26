"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchase", {
      id_purchase: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_supplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_nota: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_purchase: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total_nota: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      foto_nota: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("purchase");
  },
};
