import { DataTypes, Model } from "sequelize";

export class Page extends Model {}

export function initPage(sequelize) {
  Page.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      page_key: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      page_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true,
      },
      meta_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      meta_keywords: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      canonical_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      og_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      og_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      og_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      og_image_alt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      indexable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "published",
      },
      seed_version: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Page",
      tableName: "pages",
      paranoid: true,
    },
  );

  return Page;
}
