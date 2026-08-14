import { DataTypes, Model } from "sequelize";

export class CustomerAccount extends Model {}

export function initCustomerAccount(sequelize) {
  CustomerAccount.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      contact_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CustomerAccount",
      tableName: "customer_accounts",
      paranoid: true,
    },
  );

  return CustomerAccount;
}
