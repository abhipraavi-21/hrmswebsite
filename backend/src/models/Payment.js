import { DataTypes, Model } from "sequelize";

export class Payment extends Model {}

export function initPayment(sequelize) {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      payment_number: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      gateway_provider: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      gateway_transaction_id: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      gateway_payment_id: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: DataTypes.ENUM("initiated", "success", "failed", "refunded"),
        allowNull: false,
        defaultValue: "initiated",
      },
      failure_reason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      raw_response_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
    },
  );

  return Payment;
}
