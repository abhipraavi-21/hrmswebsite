"use strict";

async function addColumnIfMissing(queryInterface, tableName, columnName, definition) {
  const table = await queryInterface.describeTable(tableName);

  if (!table[columnName]) {
    await queryInterface.addColumn(tableName, columnName, definition);
  }
}

async function createTableIfMissing(queryInterface, tableName, definition) {
  const tables = await queryInterface.showAllTables();
  const tableNames = tables.map((table) => (typeof table === "string" ? table : table.tableName));

  if (!tableNames.includes(tableName)) {
    await queryInterface.createTable(tableName, definition);
  }
}

function nowLiteral(Sequelize) {
  return Sequelize.literal("CURRENT_TIMESTAMP");
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await addColumnIfMissing(queryInterface, "coupons", "name", {
      type: Sequelize.STRING(160),
      allowNull: false,
      defaultValue: "",
      after: "code",
    });
    await addColumnIfMissing(queryInterface, "coupons", "maximum_discount", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
      after: "discount_value",
    });
    await addColumnIfMissing(queryInterface, "coupons", "minimum_order_amount", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
      after: "maximum_discount",
    });
    await addColumnIfMissing(queryInterface, "coupons", "usage_limit_per_customer", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      after: "max_redemptions",
    });
    await addColumnIfMissing(queryInterface, "coupons", "new_customers_only", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      after: "redeemed_count",
    });
    await addColumnIfMissing(queryInterface, "coupons", "applies_to_amount", {
      type: Sequelize.ENUM("plan_only", "addons_only", "plan_and_addons"),
      allowNull: false,
      defaultValue: "plan_and_addons",
      after: "new_customers_only",
    });
    await addColumnIfMissing(queryInterface, "coupons", "monthly_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "applies_to_amount",
    });
    await addColumnIfMissing(queryInterface, "coupons", "semiannual_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "monthly_allowed",
    });
    await addColumnIfMissing(queryInterface, "coupons", "annual_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "semiannual_allowed",
    });
    await addColumnIfMissing(queryInterface, "coupons", "new_subscription_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "annual_allowed",
    });
    await addColumnIfMissing(queryInterface, "coupons", "renewal_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "new_subscription_allowed",
    });
    await addColumnIfMissing(queryInterface, "coupons", "upgrade_allowed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: "renewal_allowed",
    });
    await addColumnIfMissing(queryInterface, "coupons", "created_by", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      after: "upgrade_allowed",
    });

    await createTableIfMissing(queryInterface, "coupon_products", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "coupons", key: "id" },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "products", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
    });

    await createTableIfMissing(queryInterface, "coupon_plans", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "coupons", key: "id" },
        onDelete: "CASCADE",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "plans", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
    });

    await createTableIfMissing(queryInterface, "coupon_usages", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      coupon_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "coupons", key: "id" },
        onDelete: "CASCADE",
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "customer_accounts", key: "id" },
        onDelete: "SET NULL",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "companies", key: "id" },
        onDelete: "SET NULL",
      },
      subscription_purchase_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "subscription_purchases", key: "id" },
        onDelete: "SET NULL",
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "subscriptions", key: "id" },
        onDelete: "SET NULL",
      },
      order_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "orders", key: "id" },
        onDelete: "SET NULL",
      },
      payment_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "payments", key: "id" },
        onDelete: "SET NULL",
      },
      product_slug: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      plan_slug: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      coupon_code: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      original_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      final_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("applied", "redeemed", "void"),
        allowNull: false,
        defaultValue: "redeemed",
      },
      used_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
    });

    await queryInterface.sequelize.query(
      "UPDATE coupons SET name = code WHERE name = '' OR name IS NULL",
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("coupon_usages");
    await queryInterface.dropTable("coupon_plans");
    await queryInterface.dropTable("coupon_products");
  },
};
