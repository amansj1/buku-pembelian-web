module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      nama_company: DataTypes.STRING(50),
    },
    {
      tableName: "company",
    }
  );

  Company.associate = (models) => {
    Company.hasMany(models.Users, { foreignKey: "id_company" });
    Company.hasMany(models.Purchase, { foreignKey: "id_company" });
  };

  return Company;
};
