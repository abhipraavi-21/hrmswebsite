import { DataTypes, Model } from "sequelize";

export class ContactEnquiry extends Model {}

export function initContactEnquiry(sequelize) {
  ContactEnquiry.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      source_page: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("new", "read", "in_progress", "replied", "closed", "spam"),
        allowNull: false,
        defaultValue: "new",
      },
      admin_notes: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      extra_data_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ContactEnquiry",
      tableName: "contact_enquiries",
      paranoid: true,
    },
  );

  return ContactEnquiry;
}
