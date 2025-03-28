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

  return Company;
};
