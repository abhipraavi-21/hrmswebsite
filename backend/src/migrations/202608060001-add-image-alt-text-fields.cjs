"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pages", "og_image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "og_image",
    });

    await queryInterface.addColumn("page_sections", "image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "image_url",
    });

    await queryInterface.addColumn("page_sections", "background_image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "background_image_url",
    });

    await queryInterface.addColumn("section_items", "image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "image_url",
    });

    await queryInterface.addColumn("resource_pages", "featured_image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "featured_image",
    });

    await queryInterface.addColumn("blog_posts", "cover_image_alt", {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: "cover_image_url",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("blog_posts", "cover_image_alt");
    await queryInterface.removeColumn("resource_pages", "featured_image_alt");
    await queryInterface.removeColumn("section_items", "image_alt");
    await queryInterface.removeColumn("page_sections", "background_image_alt");
    await queryInterface.removeColumn("page_sections", "image_alt");
    await queryInterface.removeColumn("pages", "og_image_alt");
  },
};
