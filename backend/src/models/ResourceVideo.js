import { DataTypes, Model } from "sequelize";

export class ResourceVideo extends Model {}

export function initResourceVideo(sequelize) {
  ResourceVideo.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      video_source: {
        type: DataTypes.ENUM("youtube", "upload", "external"),
        allowNull: false,
        defaultValue: "youtube",
      },
      video_url: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      video_id: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      thumbnail_url: {
        type: DataTypes.STRING(2048),
        allowNull: true,
      },
      thumbnail_alt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ResourceVideo",
      tableName: "resource_videos",
      paranoid: true,
    },
  );

  return ResourceVideo;
}
