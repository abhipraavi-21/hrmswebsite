import { DataTypes, Model } from "sequelize";

export class CouponUsage extends Model {}

export function initCouponUsage(sequelize) {
  CouponUsage.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      customer_account_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      subscription_purchase_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      product_slug: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      plan_slug: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      coupon_code: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      original_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      final_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("applied", "redeemed", "void"),
        allowNull: false,
        defaultValue: "redeemed",
      },
      used_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "CouponUsage",
      tableName: "coupon_usages",
    },
  );

  return CouponUsage;
}
