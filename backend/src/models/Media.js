import { DataTypes, Model } from "sequelize";

export class Media extends Model {}

export function initMedia(sequelize) {
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      file_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      original_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      mime_type: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      file_size: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      alt_text: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      uploaded_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Media",
      tableName: "media",
      paranoid: true,
    },
  );

  return Media;
}
