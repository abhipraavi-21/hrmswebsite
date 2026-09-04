import { DataTypes, Model } from "sequelize";

export class Company extends Model {}

export function initCompany(sequelize) {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      gstin: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      address_line_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      employee_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      paranoid: true,
    },
  );

  return Company;
}
