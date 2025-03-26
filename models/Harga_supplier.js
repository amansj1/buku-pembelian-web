module.exports = (sequelize, DataTypes) => {
  const HargaSupplier = sequelize.define(
    "HargaSupplier",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_supplier: DataTypes.INTEGER,
      id_item: DataTypes.INTEGER,
      harga_satuan: DataTypes.DECIMAL(12, 2),
    },
    {
      tableName: "harga_supplier",
    }
  );

  HargaSupplier.associate = (models) => {
    HargaSupplier.belongsTo(models.Supplier, { foreignKey: "id_supplier" });
    HargaSupplier.belongsTo(models.Item, { foreignKey: "id_item" });
  };

  return HargaSupplier;
};
