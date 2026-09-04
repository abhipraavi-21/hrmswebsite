import { DataTypes, Model } from "sequelize";

export class TaxSetting extends Model {}

export function initTaxSetting(sequelize) {
  TaxSetting.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tax_name: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      tax_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      gstin: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      sac: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_inclusive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "TaxSetting",
      tableName: "tax_settings",
    },
  );

  return TaxSetting;
}
