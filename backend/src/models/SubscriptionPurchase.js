import { DataTypes, Model } from "sequelize";

export class SubscriptionPurchase extends Model {}

export function initSubscriptionPurchase(sequelize) {
  SubscriptionPurchase.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      reference_code: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      contact_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      plan_slug: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      plan_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      employee_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      billing_cycle: {
        type: DataTypes.ENUM("monthly", "half-yearly", "yearly"),
        allowNull: false,
      },
      billing_cycle_months: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      price_per_employee: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      subtotal_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      gst_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 18,
      },
      gst_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      payment_status: {
        type: DataTypes.ENUM("paid", "pending", "failed", "refunded"),
        allowNull: false,
        defaultValue: "paid",
      },
      subscription_status: {
        type: DataTypes.ENUM("active", "pending", "expired", "cancelled"),
        allowNull: false,
        defaultValue: "active",
      },
      source_page: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      purchased_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      renewal_due_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      extra_data_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SubscriptionPurchase",
      tableName: "subscription_purchases",
      paranoid: true,
    },
  );

  return SubscriptionPurchase;
}
