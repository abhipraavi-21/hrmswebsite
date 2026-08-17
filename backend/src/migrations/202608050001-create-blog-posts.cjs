"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blog_posts", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(180),
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      reading_time_label: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      description_html: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      meta_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      meta_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hero_summary_html: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      quick_answer_html: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      hero_points_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      key_takeaways_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      sections_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      faqs_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      related_links_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      cover_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: {
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("blog_posts");
  },
};
