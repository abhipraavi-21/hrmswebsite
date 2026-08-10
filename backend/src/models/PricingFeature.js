import { DataTypes, Model } from "sequelize";

export class PricingFeature extends Model {}

export function initPricingFeature(sequelize) {
  PricingFeature.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      pricing_plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      feature_text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_included: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PricingFeature",
      tableName: "pricing_features",
      paranoid: true,
    },
  );

  return PricingFeature;
}
