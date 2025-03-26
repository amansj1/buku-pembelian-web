module.exports = (sequelize, DataTypes) => {
  const DtlPurchase = sequelize.define(
    "DtlPurchase",
    {
      id_dtl_purchase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_purchase: DataTypes.INTEGER,
      id_item: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      harga_satuan: DataTypes.DECIMAL(12, 2),
      total_harga: DataTypes.DECIMAL(12, 2),
    },
    {
      tableName: "dtl_purchase",
    }
  );

  DtlPurchase.associate = (models) => {
    DtlPurchase.belongsTo(models.Purchase, { foreignKey: "id_purchase" });
    DtlPurchase.belongsTo(models.Item, { foreignKey: "id_item" });
  };

  return DtlPurchase;
};
