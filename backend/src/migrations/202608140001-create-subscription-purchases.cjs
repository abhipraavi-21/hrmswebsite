"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscription_purchases", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      reference_code: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      company_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      contact_name: {
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
      plan_slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      plan_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      employee_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      billing_cycle: {
        type: Sequelize.ENUM("monthly", "half-yearly", "yearly"),
        allowNull: false,
      },
      billing_cycle_months: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      price_per_employee: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      subtotal_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      gst_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 18,
      },
      gst_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      payment_status: {
        type: Sequelize.ENUM("paid", "pending", "failed", "refunded"),
        allowNull: false,
        defaultValue: "paid",
      },
      subscription_status: {
        type: Sequelize.ENUM("active", "pending", "expired", "cancelled"),
        allowNull: false,
        defaultValue: "active",
      },
      source_page: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      purchased_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      renewal_due_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable("subscription_purchases");
  },
};
