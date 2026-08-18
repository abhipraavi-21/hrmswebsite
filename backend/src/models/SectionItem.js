import { DataTypes, Model } from "sequelize";

export class SectionItem extends Model {}

export function initSectionItem(sequelize) {
  SectionItem.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      section_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      item_type: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      subtitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image_alt: {
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
      extra_data_json: {
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
    },
    {
      sequelize,
      modelName: "SectionItem",
      tableName: "section_items",
      paranoid: true,
    },
  );

  return SectionItem;
}
