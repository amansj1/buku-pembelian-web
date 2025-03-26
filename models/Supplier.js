module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      id_supplier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      ket: DataTypes.STRING,
    },
    {
      tableName: "supplier",
    }
  );

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Purchase, { foreignKey: "id_supplier" });
    Supplier.hasMany(models.HargaSupplier, { foreignKey: "id_supplier" });
  };

  return Supplier;
};
