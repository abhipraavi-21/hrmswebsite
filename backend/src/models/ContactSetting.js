import { DataTypes, Model } from "sequelize";

export class ContactSetting extends Model {}

export function initContactSetting(sequelize) {
  ContactSetting.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      page_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      page_subtitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone_primary: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      phone_secondary: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      email_primary: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      email_secondary: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      business_hours: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      map_embed_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      form_heading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      form_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      submit_button_text: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      success_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      error_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      social_links_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      settings_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ContactSetting",
      tableName: "contact_settings",
    },
  );

  return ContactSetting;
}
