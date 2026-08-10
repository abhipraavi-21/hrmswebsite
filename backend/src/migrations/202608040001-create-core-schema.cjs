"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admins", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: "super-admin",
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("pages", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      page_key: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      page_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      meta_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      meta_keywords: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      canonical_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      og_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      og_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      og_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      indexable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: Sequelize.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "published",
      },
      seed_version: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("page_sections", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      page_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "pages",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      section_key: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      section_type: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      internal_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      heading: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      subheading: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      background_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      button_text: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      button_link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      settings_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("section_items", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      section_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "page_sections",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      item_type: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      subtitle: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      icon: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      button_text: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      button_link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      extra_data_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("resource_pages", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      page_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "pages",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      resource_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      featured_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "published",
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("pricing_plans", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      monthly_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      yearly_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      original_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      billing_label: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      badge_text: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      button_text: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      button_link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_popular: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      settings_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("pricing_features", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pricing_plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "pricing_plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      feature_text: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_included: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("contact_settings", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      page_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      page_subtitle: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phone_primary: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      phone_secondary: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      email_primary: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      email_secondary: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      business_hours: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      map_embed_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      form_heading: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      form_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      submit_button_text: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      success_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      error_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      social_links_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      settings_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("contact_enquiries", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      company_name: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      source_page: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("new", "read", "in_progress", "replied", "closed", "spam"),
        allowNull: false,
        defaultValue: "new",
      },
      admin_notes: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      submitted_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      extra_data_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("media", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      original_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_path: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_type: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      mime_type: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      file_size: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      alt_text: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      uploaded_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "admins",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("activity_logs", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "admins",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      action: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      entity_type: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      entity_id: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      old_values_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      new_values_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("activity_logs");
    await queryInterface.dropTable("media");
    await queryInterface.dropTable("contact_enquiries");
    await queryInterface.dropTable("contact_settings");
    await queryInterface.dropTable("pricing_features");
    await queryInterface.dropTable("pricing_plans");
    await queryInterface.dropTable("resource_pages");
    await queryInterface.dropTable("section_items");
    await queryInterface.dropTable("page_sections");
    await queryInterface.dropTable("pages");
    await queryInterface.dropTable("admins");
  },
};
