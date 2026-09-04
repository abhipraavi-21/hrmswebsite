import { DataTypes, Model } from "sequelize";

export class PlanFeature extends Model {}

export function initPlanFeature(sequelize) {
  PlanFeature.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      feature_code: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      feature_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "PlanFeature",
      tableName: "plan_features",
    },
  );

  return PlanFeature;
}
