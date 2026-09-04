import { DataTypes, Model } from "sequelize";

export class Order extends Model {}

export function initOrder(sequelize) {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      order_number: {
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
      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      lifecycle_type: {
        type: DataTypes.ENUM("new", "renewal", "upgrade", "addon"),
        allowNull: false,
        defaultValue: "new",
      },
      billing_cycle: {
        type: DataTypes.ENUM("monthly", "semiannual", "annual", "biennial", "triennial"),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      base_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      addon_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      setup_charge_amount: {
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
      gateway_provider: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: "sandbox",
      },
      gateway_order_id: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "pending_payment", "paid", "failed", "cancelled", "refunded"),
        allowNull: false,
        defaultValue: "draft",
      },
      selected_addons_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      coupon_code: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      metadata_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    },
  );

  return Order;
}
