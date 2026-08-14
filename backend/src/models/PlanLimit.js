import { DataTypes, Model } from "sequelize";

export class PlanLimit extends Model {}

export function initPlanLimit(sequelize) {
  PlanLimit.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      limit_code: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      limit_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      limit_value: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      is_unlimited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "PlanLimit",
      tableName: "plan_limits",
    },
  );

  return PlanLimit;
}
