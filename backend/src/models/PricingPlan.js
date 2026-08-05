import { DataTypes, Model } from "sequelize";

export class PricingPlan extends Model {}

export function initPricingPlan(sequelize) {
  PricingPlan.init(
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
      slug: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      monthly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      yearly_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      billing_label: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      badge_text: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      button_text: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      button_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_popular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      settings_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PricingPlan",
      tableName: "pricing_plans",
      paranoid: true,
    },
  );

  return PricingPlan;
}
