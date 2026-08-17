"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const ordersTable = await queryInterface.describeTable("orders");
    const subscriptionsTable = await queryInterface.describeTable("subscriptions");
    const invoicesTable = await queryInterface.describeTable("invoices");

    if (!ordersTable.setup_charge_amount) {
      await queryInterface.addColumn("orders", "setup_charge_amount", {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (!subscriptionsTable.setup_charge_amount) {
      await queryInterface.addColumn("subscriptions", "setup_charge_amount", {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      });
    }

    if (!invoicesTable.setup_charge_amount) {
      await queryInterface.addColumn("invoices", "setup_charge_amount", {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      });
    }
  },

  async down(queryInterface) {
    const ordersTable = await queryInterface.describeTable("orders");
    const subscriptionsTable = await queryInterface.describeTable("subscriptions");
    const invoicesTable = await queryInterface.describeTable("invoices");

    if (invoicesTable.setup_charge_amount) {
      await queryInterface.removeColumn("invoices", "setup_charge_amount");
    }

    if (subscriptionsTable.setup_charge_amount) {
      await queryInterface.removeColumn("subscriptions", "setup_charge_amount");
    }

    if (ordersTable.setup_charge_amount) {
      await queryInterface.removeColumn("orders", "setup_charge_amount");
    }
  },
};
