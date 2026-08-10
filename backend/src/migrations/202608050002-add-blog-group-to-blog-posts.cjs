"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("blog_posts", "blog_group", {
      type: Sequelize.ENUM("hrms", "bulk-email", "asset-management"),
      allowNull: false,
      defaultValue: "hrms",
      after: "slug",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("blog_posts", "blog_group");
  },
};
