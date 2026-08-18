"use strict";

const HRMS_ADDONS = [
  {
    code: "GEO_ATTENDANCE",
    name: "Geo Tracking",
    description: "Track attendance and location activity for each employee across the full subscription term.",
    pricingType: "PER_EMPLOYEE",
    monthlyPrice: null,
    annualPrice: null,
    unitPrice: 50,
    displayOrder: 0,
    metadata: {
      featureCode: "GEO_ATTENDANCE",
      pricingSummary: "₹50 per user / month",
      minimumLabel: "Minimum 5 users required",
      details: [
        "Billing starts from a minimum of 5 users.",
        "Best fit for field teams, site teams and mobile attendance flows.",
      ],
      quantityLabel: "Users",
      minimumQuantity: 5,
      minimumChargeQuantity: 5,
      usesEmployeeCount: true,
      showQuantityInput: false,
      calculationMode: "per_employee_minimum",
    },
  },
  {
    code: "WHATSAPP_ALERTS",
    name: "WhatsApp Alerts",
    description: "Send attendance, leave, payroll and HR notifications on WhatsApp.",
    pricingType: "PER_USER",
    monthlyPrice: null,
    annualPrice: null,
    unitPrice: 70,
    displayOrder: 1,
    metadata: {
      featureCode: "WHATSAPP_ALERTS",
      pricingSummary: "₹70 per user / month",
      minimumLabel: "Based on selected users",
      details: [
        "Charges scale according to the number of users selected.",
        "Useful for attendance, leave, payroll and HR notification updates.",
      ],
      quantityLabel: "Users",
      minimumQuantity: 1,
      defaultToEmployeeCount: true,
      showQuantityInput: true,
      calculationMode: "per_selected_quantity",
    },
  },
  {
    code: "BIOMETRIC_MACHINE_SETUP",
    name: "Biometric Machine Setup",
    description: "Connect biometric machines and sync attendance setup across sites.",
    pricingType: "ONE_TIME",
    monthlyPrice: null,
    annualPrice: null,
    unitPrice: 2000,
    displayOrder: 2,
    metadata: {
      featureCode: "BIOMETRIC_MACHINE_SETUP",
      pricingSummary: "₹2,000 per machine",
      minimumLabel: "First machine included",
      details: [
        "Setup charges apply from the 2nd biometric machine onward.",
        "A clean option when attendance hardware needs to be rolled out gradually.",
      ],
      quantityLabel: "Machines",
      minimumQuantity: 1,
      defaultQuantity: 2,
      includedQuantity: 1,
      showQuantityInput: true,
      calculationMode: "one_time_after_included",
    },
  },
  {
    code: "ASSET_MANAGEMENT_ADDON",
    name: "Asset Management",
    description: "Extend HRMS with asset workflows, handovers and tracking visibility.",
    pricingType: "PER_EMPLOYEE",
    monthlyPrice: null,
    annualPrice: null,
    unitPrice: 1.5,
    displayOrder: 3,
    metadata: {
      featureCode: "ASSET_MANAGEMENT",
      pricingSummary: "₹1.50 per employee / month",
      minimumLabel: "50 assets included",
      details: [
        "Asset Management starts with a minimum of 100 assets.",
        "Additional assets are charged at ₹50 per asset.",
      ],
      quantityLabel: "Assets",
      minimumQuantity: 100,
      defaultQuantity: 100,
      includedQuantity: 50,
      extraUnitPrice: 50,
      showQuantityInput: true,
      calculationMode: "asset_management_combo",
    },
  },
  {
    code: "RECRUITMENT_MODULE",
    name: "Recruitment Module",
    description: "Manage hiring activity and recruitment demand from the same checkout flow.",
    pricingType: "ONE_TIME",
    monthlyPrice: null,
    annualPrice: null,
    unitPrice: 1000,
    displayOrder: 4,
    metadata: {
      featureCode: "RECRUITMENT_MODULE",
      pricingSummary: "₹1,000 per 100 applicants",
      minimumLabel: "10 applicants included",
      details: [
        "The first 10 applicants are included.",
        "After that, every additional 100 applicants is charged at ₹1,000.",
      ],
      quantityLabel: "Applicants",
      minimumQuantity: 10,
      defaultQuantity: 110,
      includedQuantity: 10,
      stepQuantity: 100,
      showQuantityInput: true,
      calculationMode: "recruitment_blocks",
    },
  },
];

const LEGACY_GEO_ADDON = {
  name: "Geo Attendance / Geo-Fencing",
  description: "GPS-aware attendance and geo-fencing enforcement.",
  pricing_type: "FLAT_MONTHLY",
  monthly_price: 499,
  annual_price: 4990,
  unit_price: null,
  display_order: 0,
  metadata_json: JSON.stringify({ featureCode: "GEO_ATTENDANCE" }),
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const insertedProducts = await queryInterface.sequelize.query(
      "SELECT id FROM products WHERE code = :code LIMIT 1",
      {
        replacements: { code: "HRMS" },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const productId = insertedProducts[0]?.id;

    if (!productId) {
      return;
    }

    for (const addon of HRMS_ADDONS) {
      const existingRows = await queryInterface.sequelize.query(
        "SELECT id FROM addons WHERE code = :code LIMIT 1",
        {
          replacements: { code: addon.code },
          type: Sequelize.QueryTypes.SELECT,
        },
      );

      const payload = {
        product_id: productId,
        name: addon.name,
        description: addon.description,
        pricing_type: addon.pricingType,
        monthly_price: addon.monthlyPrice,
        annual_price: addon.annualPrice,
        unit_price: addon.unitPrice,
        currency: "INR",
        status: "active",
        display_order: addon.displayOrder,
        metadata_json: JSON.stringify(addon.metadata),
        deleted_at: null,
        updated_at: new Date(),
      };

      if (existingRows[0]?.id) {
        await queryInterface.bulkUpdate("addons", payload, { id: existingRows[0].id });
      } else {
        await queryInterface.bulkInsert(
          "addons",
          [
            {
              ...payload,
              code: addon.code,
              created_at: new Date(),
            },
          ],
          {},
        );
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "addons",
      {
        code: [
          "WHATSAPP_ALERTS",
          "BIOMETRIC_MACHINE_SETUP",
          "ASSET_MANAGEMENT_ADDON",
          "RECRUITMENT_MODULE",
        ],
      },
      {},
    );

    await queryInterface.bulkUpdate("addons", LEGACY_GEO_ADDON, {
      code: "GEO_ATTENDANCE",
    });
  },
};
