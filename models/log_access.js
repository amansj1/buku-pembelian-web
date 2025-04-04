const { DataTypes, Sequelize } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  const Log_action = Sequelize.define(
    "Log_action",
    {
      log_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tgl_action: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "log_action",
      timestamps: false,
    }
  );

  return Log_action;
};
