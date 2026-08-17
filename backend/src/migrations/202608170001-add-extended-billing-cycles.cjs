"use strict";

const NEXT_ENUM = "ENUM('monthly', 'semiannual', 'annual', 'biennial', 'triennial')";
const PREVIOUS_ENUM = "ENUM('monthly', 'semiannual', 'annual')";

async function alterBillingCycleColumn(queryInterface, tableName, columnName, enumSql) {
  await queryInterface.sequelize.query(`
    ALTER TABLE \`${tableName}\`
    MODIFY COLUMN \`${columnName}\` ${enumSql} NOT NULL
  `);
}

module.exports = {
  async up(queryInterface) {
    await alterBillingCycleColumn(queryInterface, "checkout_intents", "billing_cycle", NEXT_ENUM);
    await alterBillingCycleColumn(queryInterface, "subscriptions", "billing_cycle", NEXT_ENUM);
    await alterBillingCycleColumn(queryInterface, "orders", "billing_cycle", NEXT_ENUM);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE \`checkout_intents\`
      SET \`billing_cycle\` = 'annual'
      WHERE \`billing_cycle\` IN ('biennial', 'triennial')
    `);
    await queryInterface.sequelize.query(`
      UPDATE \`subscriptions\`
      SET \`billing_cycle\` = 'annual'
      WHERE \`billing_cycle\` IN ('biennial', 'triennial')
    `);
    await queryInterface.sequelize.query(`
      UPDATE \`orders\`
      SET \`billing_cycle\` = 'annual'
      WHERE \`billing_cycle\` IN ('biennial', 'triennial')
    `);

    await alterBillingCycleColumn(queryInterface, "checkout_intents", "billing_cycle", PREVIOUS_ENUM);
    await alterBillingCycleColumn(queryInterface, "subscriptions", "billing_cycle", PREVIOUS_ENUM);
    await alterBillingCycleColumn(queryInterface, "orders", "billing_cycle", PREVIOUS_ENUM);
  },
};
