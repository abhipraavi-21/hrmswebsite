import { DataTypes, Model } from "sequelize";

export class CheckoutIntent extends Model {}

export function initCheckoutIntent(sequelize) {
  CheckoutIntent.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      intent_token: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      customer_account_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
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
      coupon_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "completed", "abandoned"),
        allowNull: false,
        defaultValue: "active",
      },
      source_route: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      selected_addons_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CheckoutIntent",
      tableName: "checkout_intents",
    },
  );

  return CheckoutIntent;
}
