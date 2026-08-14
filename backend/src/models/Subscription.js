import { DataTypes, Model } from "sequelize";

export class Subscription extends Model {}

export function initSubscription(sequelize) {
  Subscription.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      subscription_number: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      customer_account_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      billing_cycle: {
        type: DataTypes.ENUM("monthly", "semiannual", "annual"),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      renewal_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "trial",
          "active",
          "expiring",
          "expired",
          "suspended",
          "cancelled",
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      base_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      addon_total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      auto_renew: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName: "subscriptions",
      paranoid: true,
    },
  );

  return Subscription;
}
