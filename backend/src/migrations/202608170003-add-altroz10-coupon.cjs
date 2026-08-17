"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingCoupons = await queryInterface.sequelize.query(
      "SELECT id FROM coupons WHERE code = :code LIMIT 1",
      {
        replacements: { code: "ALTROZ10" },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (existingCoupons.length) {
      return;
    }

    await queryInterface.bulkInsert("coupons", [
      {
        code: "ALTROZ10",
        description: "10% off the final payable amount.",
        discount_type: "percent",
        discount_value: 10,
        applies_to_scope: "all_products",
        product_id: null,
        plan_id: null,
        status: "active",
        starts_at: null,
        ends_at: null,
        max_redemptions: null,
        redeemed_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("coupons", { code: "ALTROZ10" });
  },
};
