import { DataTypes, Model } from "sequelize";

export class Addon extends Model {}

export function initAddon(sequelize) {
  Addon.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pricing_type: {
        type: DataTypes.ENUM(
          "FLAT_MONTHLY",
          "FLAT_YEARLY",
          "PER_EMPLOYEE",
          "PER_USER",
          "PER_ASSET",
          "PER_EMAIL_CREDIT",
          "PER_LOCATION",
          "ONE_TIME",
        ),
        allowNull: false,
      },
      monthly_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      annual_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      metadata_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Addon",
      tableName: "addons",
      paranoid: true,
    },
  );

  return Addon;
}
