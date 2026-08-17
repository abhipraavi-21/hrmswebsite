import { DataTypes, Model } from "sequelize";

export class BlogPost extends Model {}

export function initBlogPost(sequelize) {
  BlogPost.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
      },
      blog_group: {
        type: DataTypes.ENUM("hrms", "bulk-email", "asset-management"),
        allowNull: false,
        defaultValue: "hrms",
      },
      category: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      reading_time_label: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      description_html: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      meta_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      hero_summary_html: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      quick_answer_html: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      hero_points_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      key_takeaways_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      sections_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      faqs_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      related_links_json: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      cover_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cover_image_alt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BlogPost",
      tableName: "blog_posts",
      paranoid: true,
    },
  );

  return BlogPost;
}
