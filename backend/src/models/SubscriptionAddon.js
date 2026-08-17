import { DataTypes, Model } from "sequelize";

export class SubscriptionAddon extends Model {}

export function initSubscriptionAddon(sequelize) {
  SubscriptionAddon.init(
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
      addon_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "expired", "cancelled"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "SubscriptionAddon",
      tableName: "subscription_addons",
    },
  );

  return SubscriptionAddon;
}
