import { DataTypes, Model } from "sequelize";

export class ActivityLog extends Model {}

export function initActivityLog(sequelize) {
  ActivityLog.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      entity_type: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      entity_id: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      old_values_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      new_values_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ActivityLog",
      tableName: "activity_logs",
      updatedAt: false,
    },
  );

  return ActivityLog;
}
