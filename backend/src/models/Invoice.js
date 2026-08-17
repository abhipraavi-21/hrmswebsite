import { DataTypes, Model } from "sequelize";

export class Invoice extends Model {}

export function initInvoice(sequelize) {
  Invoice.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_number: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
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
      billing_period_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      billing_period_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      subtotal_amount: {
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
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: DataTypes.ENUM("issued", "paid", "void", "refunded"),
        allowNull: false,
        defaultValue: "issued",
      },
      line_items_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      issued_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoice",
      tableName: "invoices",
    },
  );

  return Invoice;
}
