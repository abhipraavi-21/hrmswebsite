import { DataTypes, Model } from "sequelize";

export class SubscriptionUsage extends Model {}

export function initSubscriptionUsage(sequelize) {
  SubscriptionUsage.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      metric_code: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      used_value: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      limit_value: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      period_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      period_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SubscriptionUsage",
      tableName: "subscription_usage",
    },
  );

  return SubscriptionUsage;
}
