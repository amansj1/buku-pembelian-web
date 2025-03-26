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
      isPkp: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      no_faktuk: {
        type: Sequelize.STRING,
        allowNull: true,
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
      disc: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      ongkir: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      grand_total: {
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
