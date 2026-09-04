import { DataTypes, Model } from "sequelize";

export class ResourcePage extends Model {}

export function initResourcePage(sequelize) {
  ResourcePage.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      page_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      resource_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      featured_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      featured_image_alt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "published",
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "ResourcePage",
      tableName: "resource_pages",
      paranoid: true,
    },
  );

  return ResourcePage;
}
