import { DataTypes, Model } from "sequelize";

export class PageSection extends Model {}

export function initPageSection(sequelize) {
  PageSection.init(
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
      section_key: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      section_type: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      internal_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      heading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      subheading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      background_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      button_text: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      button_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      settings_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "PageSection",
      tableName: "page_sections",
      paranoid: true,
    },
  );

  return PageSection;
}
