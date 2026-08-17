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
      description: {
        type: DataTypes.STRING(255),
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
      redeemed_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
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
