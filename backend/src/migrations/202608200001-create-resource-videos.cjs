"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resource_videos", {
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
      label: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      video_source: {
        type: Sequelize.ENUM("youtube", "upload", "external"),
        allowNull: false,
        defaultValue: "youtube",
      },
      video_url: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      video_id: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      thumbnail_url: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },
      thumbnail_alt: {
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

    await queryInterface.bulkInsert("resource_videos", [
      {
        title:
          "Leave Management Software: Simplify Employee Leave Approvals | Altroz HR | #leavemanagement #hrms",
        label: "Featured video",
        description: "Play this video directly on the page.",
        video_source: "youtube",
        video_url: "https://www.youtube.com/watch?v=gYLKTRQ1Hwo",
        video_id: "gYLKTRQ1Hwo",
        thumbnail_url: "https://i.ytimg.com/vi/gYLKTRQ1Hwo/hqdefault.jpg",
        thumbnail_alt:
          "Leave Management Software: Simplify Employee Leave Approvals | Altroz HR | #leavemanagement #hrms",
        status: "published",
        display_order: 0,
        published_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        title: "Update tenant configuration",
        label: "Featured video",
        description: "Play this video directly on the page.",
        video_source: "youtube",
        video_url: "https://www.youtube.com/watch?v=nkFBzliqulI",
        video_id: "nkFBzliqulI",
        thumbnail_url: "https://i.ytimg.com/vi/nkFBzliqulI/hqdefault.jpg",
        thumbnail_alt: "Update tenant configuration",
        status: "published",
        display_order: 1,
        published_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
        updated_at: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("resource_videos");
  },
};
