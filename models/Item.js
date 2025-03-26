module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      id_item: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      no_item: DataTypes.STRING,
      nama_item: DataTypes.STRING,
      kategori: DataTypes.STRING,
      satuan: DataTypes.STRING,
      ket: DataTypes.STRING,
    },
    {
      tableName: "item",
    }
  );

  Item.associate = (models) => {
    Item.hasMany(models.DtlPurchase, { foreignKey: "id_item" });
    Item.hasMany(models.HargaSupplier, { foreignKey: "id_item" });
  };

  return Item;
};
