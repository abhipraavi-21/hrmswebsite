import { DataTypes, Model } from "sequelize";

export class Coupon extends Model {}

export function initCoupon(sequelize) {
  Coupon.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(160),
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      discount_type: {
        type: DataTypes.ENUM("percent", "fixed"),
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      maximum_discount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      minimum_order_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      applies_to_scope: {
        type: DataTypes.ENUM("all_products", "product", "plan"),
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      starts_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ends_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      max_redemptions: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      usage_limit_per_customer: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      redeemed_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      new_customers_only: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      applies_to_amount: {
        type: DataTypes.ENUM("plan_only", "addons_only", "plan_and_addons"),
        allowNull: false,
        defaultValue: "plan_and_addons",
      },
      monthly_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      semiannual_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      annual_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      new_subscription_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      renewal_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      upgrade_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Coupon",
      tableName: "coupons",
    },
  );

  return Coupon;
}
