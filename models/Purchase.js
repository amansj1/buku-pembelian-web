module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    "Purchase",
    {
      id_purchase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_supplier: DataTypes.INTEGER,
      id_company: DataTypes.STRING,
      no_nota: DataTypes.STRING,
      tgl_purchase: DataTypes.DATE,
      total_nota: DataTypes.DECIMAL(12, 2),
      foto_nota: DataTypes.STRING,
    },
    {
      tableName: "purchase",
    }
  );

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Supplier, { foreignKey: "id_supplier" });
    Purchase.belongsTo(models.Company, { foreignKey: "id_company" });
    Purchase.hasMany(models.DtlPurchase, { foreignKey: "id_purchase" });
  };

  return Purchase;
};
