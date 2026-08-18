"use strict";

const productSeeds = [
  {
    code: "HRMS",
    name: "HRMS",
    slug: "hrms",
    description: "Human resource management system covering workforce, attendance, leave, payroll and people operations.",
    icon: "BadgeCheck",
    plans: [
      {
        code: "HRMS_STARTER",
        name: "Starter",
        slug: "starter",
        description: "Core HRMS workflows for smaller teams starting their digital people operations.",
        monthlyPrice: 1499,
        annualPrice: 14990,
        isPopular: false,
        features: [
          ["EMPLOYEE_MANAGEMENT", "Employee Management"],
          ["ATTENDANCE", "Attendance"],
          ["LEAVE_MANAGEMENT", "Leave Management"],
          ["REPORTING", "Reporting"],
        ],
        limits: [
          ["EMPLOYEES", "Employees", 50, "employees"],
          ["BRANCHES", "Branches", 3, "branches"],
          ["ADMINS", "Admins", 3, "admins"],
          ["STORAGE", "Storage", 20, "GB"],
        ],
      },
      {
        code: "HRMS_PROFESSIONAL",
        name: "Professional",
        slug: "professional",
        description: "Broader HR operations with payroll, assets, compliance and richer workflow coverage.",
        monthlyPrice: 2999,
        annualPrice: 29990,
        isPopular: true,
        features: [
          ["EMPLOYEE_MANAGEMENT", "Employee Management"],
          ["ATTENDANCE", "Attendance"],
          ["LEAVE_MANAGEMENT", "Leave Management"],
          ["PAYROLL", "Payroll"],
          ["DOCUMENTS", "Documents"],
          ["REPORTING", "Reporting"],
        ],
        limits: [
          ["EMPLOYEES", "Employees", 200, "employees"],
          ["BRANCHES", "Branches", 10, "branches"],
          ["ADMINS", "Admins", 10, "admins"],
          ["STORAGE", "Storage", 100, "GB"],
        ],
      },
      {
        code: "HRMS_ENTERPRISE",
        name: "Enterprise",
        slug: "enterprise",
        description: "Enterprise-ready HR operations with the broadest limit coverage and advanced rollout capacity.",
        monthlyPrice: 5499,
        annualPrice: 54990,
        isPopular: false,
        features: [
          ["EMPLOYEE_MANAGEMENT", "Employee Management"],
          ["ATTENDANCE", "Attendance"],
          ["LEAVE_MANAGEMENT", "Leave Management"],
          ["PAYROLL", "Payroll"],
          ["DOCUMENTS", "Documents"],
          ["RECRUITMENT", "Recruitment"],
          ["PERFORMANCE", "Performance"],
          ["REPORTING", "Reporting"],
        ],
        limits: [
          ["EMPLOYEES", "Employees", 1000, "employees"],
          ["BRANCHES", "Branches", 50, "branches"],
          ["ADMINS", "Admins", 50, "admins"],
          ["STORAGE", "Storage", 500, "GB"],
        ],
      },
    ],
    addons: [
      {
        code: "GEO_ATTENDANCE",
        name: "Geo Attendance / Geo-Fencing",
        description: "GPS-aware attendance and geo-fencing enforcement.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 499,
        annualPrice: 4990,
        metadata: { featureCode: "GEO_ATTENDANCE" },
      },
      {
        code: "ADVANCED_PAYROLL",
        name: "Advanced Payroll",
        description: "Extended payroll workflows and advanced calculations.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 799,
        annualPrice: 7990,
        metadata: { featureCode: "ADVANCED_PAYROLL" },
      },
      {
        code: "RECRUITMENT_ATS",
        name: "Recruitment / ATS",
        description: "Applicant tracking and recruiting workflow coverage.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 999,
        annualPrice: 9990,
        metadata: { featureCode: "RECRUITMENT_ATS" },
      },
      {
        code: "ADVANCED_ANALYTICS",
        name: "Advanced Analytics",
        description: "Extra dashboards and reporting depth.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 699,
        annualPrice: 6990,
        metadata: { featureCode: "ADVANCED_ANALYTICS" },
      },
      {
        code: "EMPLOYEE_SELF_SERVICE",
        name: "Employee Self Service",
        description: "Self-service portal for employees.",
        pricingType: "PER_EMPLOYEE",
        unitPrice: 15,
        metadata: { featureCode: "EMPLOYEE_SELF_SERVICE", limitCode: "EMPLOYEES", limitMultiplier: 1 },
      },
      {
        code: "PERFORMANCE_MANAGEMENT",
        name: "Performance Management",
        description: "Performance planning and review workflows.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 549,
        annualPrice: 5490,
        metadata: { featureCode: "PERFORMANCE_MANAGEMENT" },
      },
    ],
  },
  {
    code: "BULK_EMAIL",
    name: "Bulk Email",
    slug: "bulk-email",
    description: "Bulk email campaigns, sender infrastructure, automation and delivery analytics.",
    icon: "MailCheck",
    plans: [
      {
        code: "BULK_EMAIL_STARTER",
        name: "Starter",
        slug: "starter",
        description: "Email broadcasting essentials for growing business communication teams.",
        monthlyPrice: 1199,
        annualPrice: 11990,
        isPopular: false,
        features: [
          ["CAMPAIGNS", "Campaigns"],
          ["TEMPLATES", "Templates"],
          ["ANALYTICS", "Analytics"],
        ],
        limits: [
          ["MONTHLY_EMAILS", "Monthly Emails", 25000, "emails"],
          ["CONTACTS", "Contacts", 10000, "contacts"],
          ["SENDER_DOMAINS", "Sender Domains", 1, "domains"],
          ["TEAM_MEMBERS", "Team Members", 2, "users"],
          ["AUTOMATION_WORKFLOWS", "Automation Workflows", 3, "workflows"],
        ],
      },
      {
        code: "BULK_EMAIL_GROWTH",
        name: "Growth",
        slug: "growth",
        description: "A balanced plan for businesses with heavier sending and richer campaign operations.",
        monthlyPrice: 1999,
        annualPrice: 19990,
        isPopular: true,
        features: [
          ["CAMPAIGNS", "Campaigns"],
          ["TEMPLATES", "Templates"],
          ["ANALYTICS", "Analytics"],
          ["AUTOMATIONS", "Automations"],
          ["SCHEDULING", "Scheduling"],
        ],
        limits: [
          ["MONTHLY_EMAILS", "Monthly Emails", 100000, "emails"],
          ["CONTACTS", "Contacts", 50000, "contacts"],
          ["SENDER_DOMAINS", "Sender Domains", 5, "domains"],
          ["TEAM_MEMBERS", "Team Members", 5, "users"],
          ["AUTOMATION_WORKFLOWS", "Automation Workflows", 12, "workflows"],
        ],
      },
      {
        code: "BULK_EMAIL_BUSINESS",
        name: "Business",
        slug: "business",
        description: "Enterprise-ready bulk email coverage with the highest scale and team limits.",
        monthlyPrice: 3999,
        annualPrice: 39990,
        isPopular: false,
        features: [
          ["CAMPAIGNS", "Campaigns"],
          ["TEMPLATES", "Templates"],
          ["ANALYTICS", "Analytics"],
          ["AUTOMATIONS", "Automations"],
          ["SCHEDULING", "Scheduling"],
          ["ADVANCED_DELIVERY", "Advanced Delivery"],
        ],
        limits: [
          ["MONTHLY_EMAILS", "Monthly Emails", 500000, "emails"],
          ["CONTACTS", "Contacts", 250000, "contacts"],
          ["SENDER_DOMAINS", "Sender Domains", 20, "domains"],
          ["TEAM_MEMBERS", "Team Members", 20, "users"],
          ["AUTOMATION_WORKFLOWS", "Automation Workflows", 50, "workflows"],
        ],
      },
    ],
    addons: [
      {
        code: "EXTRA_EMAIL_CREDITS",
        name: "Extra Email Credits",
        description: "Additional send capacity on top of the monthly allowance.",
        pricingType: "PER_EMAIL_CREDIT",
        unitPrice: 0.01,
        metadata: { limitCode: "MONTHLY_EMAILS", limitMultiplier: 1 },
      },
      {
        code: "DEDICATED_IP",
        name: "Dedicated IP",
        description: "Dedicated sending IP for stronger delivery control.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 799,
        annualPrice: 7990,
        metadata: { featureCode: "DEDICATED_IP" },
      },
      {
        code: "EMAIL_VERIFICATION",
        name: "Email Verification",
        description: "Address verification support for cleaner sender lists.",
        pricingType: "PER_EMAIL_CREDIT",
        unitPrice: 0.004,
        metadata: { featureCode: "EMAIL_VERIFICATION" },
      },
      {
        code: "ADVANCED_EMAIL_ANALYTICS",
        name: "Advanced Analytics",
        description: "Deeper email reporting and campaign intelligence.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 599,
        annualPrice: 5990,
        metadata: { featureCode: "ADVANCED_ANALYTICS" },
      },
      {
        code: "AUTOMATION_WORKFLOWS_ADDON",
        name: "Automation Workflows",
        description: "Additional automation capacity for lifecycle campaigns.",
        pricingType: "ONE_TIME",
        unitPrice: 299,
        metadata: { limitCode: "AUTOMATION_WORKFLOWS", limitMultiplier: 1 },
      },
      {
        code: "ADDITIONAL_SENDER_DOMAINS",
        name: "Additional Sender Domains",
        description: "More verified sender domains.",
        pricingType: "ONE_TIME",
        unitPrice: 199,
        metadata: { limitCode: "SENDER_DOMAINS", limitMultiplier: 1 },
      },
      {
        code: "PRIORITY_DELIVERY",
        name: "Priority Delivery",
        description: "Priority queueing and delivery support.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 399,
        annualPrice: 3990,
        metadata: { featureCode: "PRIORITY_DELIVERY" },
      },
      {
        code: "ADDITIONAL_TEAM_MEMBERS",
        name: "Additional Team Members",
        description: "Extra seats for the email operations team.",
        pricingType: "PER_USER",
        unitPrice: 199,
        metadata: { limitCode: "TEAM_MEMBERS", limitMultiplier: 1 },
      },
    ],
  },
  {
    code: "ASSET_MANAGEMENT",
    name: "Asset Management",
    slug: "asset-management",
    description: "Asset tracking, lifecycle, maintenance, assignment and operational visibility.",
    icon: "PackageCheck",
    plans: [
      {
        code: "ASSET_STARTER",
        name: "Starter",
        slug: "starter",
        description: "Entry plan for tracking assets, assignments and basic reporting.",
        monthlyPrice: 999,
        annualPrice: 9990,
        isPopular: false,
        features: [
          ["ASSET_TRACKING", "Asset Tracking"],
          ["ASSIGNMENT", "Assignment"],
          ["REPORTING", "Reporting"],
        ],
        limits: [
          ["ASSETS", "Assets", 250, "assets"],
          ["USERS", "Users", 5, "users"],
          ["LOCATIONS", "Locations", 3, "locations"],
          ["STORAGE", "Storage", 20, "GB"],
          ["MAINTENANCE_RECORDS", "Maintenance Records", 250, "records"],
        ],
      },
      {
        code: "ASSET_PROFESSIONAL",
        name: "Professional",
        slug: "professional",
        description: "Operational asset coverage for scaling teams with more sites and active lifecycle tracking.",
        monthlyPrice: 2499,
        annualPrice: 24990,
        isPopular: true,
        features: [
          ["ASSET_TRACKING", "Asset Tracking"],
          ["ASSIGNMENT", "Assignment"],
          ["MAINTENANCE", "Maintenance"],
          ["REPORTING", "Reporting"],
        ],
        limits: [
          ["ASSETS", "Assets", 1000, "assets"],
          ["USERS", "Users", 25, "users"],
          ["LOCATIONS", "Locations", 10, "locations"],
          ["STORAGE", "Storage", 100, "GB"],
          ["MAINTENANCE_RECORDS", "Maintenance Records", 1000, "records"],
        ],
      },
      {
        code: "ASSET_ENTERPRISE",
        name: "Enterprise",
        slug: "enterprise",
        description: "Highest scale plan for distributed asset operations and advanced maintenance coverage.",
        monthlyPrice: 4499,
        annualPrice: 44990,
        isPopular: false,
        features: [
          ["ASSET_TRACKING", "Asset Tracking"],
          ["ASSIGNMENT", "Assignment"],
          ["MAINTENANCE", "Maintenance"],
          ["REPORTING", "Reporting"],
          ["ADVANCED_LIFECYCLE", "Advanced Lifecycle"],
        ],
        limits: [
          ["ASSETS", "Assets", 5000, "assets"],
          ["USERS", "Users", 100, "users"],
          ["LOCATIONS", "Locations", 50, "locations"],
          ["STORAGE", "Storage", 500, "GB"],
          ["MAINTENANCE_RECORDS", "Maintenance Records", 5000, "records"],
        ],
      },
    ],
    addons: [
      {
        code: "ADDITIONAL_ASSETS",
        name: "Additional Assets",
        description: "Extra asset capacity in the subscription entitlement.",
        pricingType: "PER_ASSET",
        unitPrice: 1.2,
        metadata: { limitCode: "ASSETS", limitMultiplier: 1 },
      },
      {
        code: "QR_BARCODE",
        name: "QR / Barcode Management",
        description: "Enable QR and barcode powered asset identification.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 299,
        annualPrice: 2990,
        metadata: { featureCode: "QR_BARCODE" },
      },
      {
        code: "GPS_TRACKING",
        name: "GPS Tracking",
        description: "Location-aware asset tracking coverage.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 499,
        annualPrice: 4990,
        metadata: { featureCode: "GPS_TRACKING" },
      },
      {
        code: "AMC_WARRANTY",
        name: "AMC & Warranty Management",
        description: "Advanced coverage for contracts and warranty events.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 399,
        annualPrice: 3990,
        metadata: { featureCode: "AMC_WARRANTY" },
      },
      {
        code: "ADVANCED_REPORTS",
        name: "Advanced Reports",
        description: "Additional reporting depth for asset analytics.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 299,
        annualPrice: 2990,
        metadata: { featureCode: "ADVANCED_REPORTS" },
      },
      {
        code: "ADDITIONAL_LOCATIONS",
        name: "Additional Locations",
        description: "Expand the number of supported asset locations.",
        pricingType: "PER_LOCATION",
        unitPrice: 149,
        metadata: { limitCode: "LOCATIONS", limitMultiplier: 1 },
      },
      {
        code: "ADDITIONAL_USERS",
        name: "Additional Users",
        description: "Extra seats for the asset management team.",
        pricingType: "PER_USER",
        unitPrice: 99,
        metadata: { limitCode: "USERS", limitMultiplier: 1 },
      },
      {
        code: "MAINTENANCE_MANAGEMENT",
        name: "Maintenance Management",
        description: "Advanced maintenance workflow coverage.",
        pricingType: "FLAT_MONTHLY",
        monthlyPrice: 349,
        annualPrice: 3490,
        metadata: { featureCode: "MAINTENANCE_MANAGEMENT" },
      },
    ],
  },
];

const couponSeeds = [
  {
    code: "SAAS10",
    description: "10% off across all products.",
    discountType: "percent",
    discountValue: 10,
    appliesToScope: "all_products",
    productCode: null,
    planCode: null,
  },
  {
    code: "WELCOME20",
    description: "20% off HRMS plans.",
    discountType: "percent",
    discountValue: 20,
    appliesToScope: "product",
    productCode: "HRMS",
    planCode: null,
  },
];

function nowLiteral(Sequelize) {
  return Sequelize.literal("CURRENT_TIMESTAMP");
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      gstin: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      address_line_1: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      address_line_2: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      employee_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addColumn("customer_accounts", "company_id", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "companies",
        key: "id",
      },
      onDelete: "SET NULL",
    });

    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      icon: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("plans", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      monthly_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      annual_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      is_popular: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    await queryInterface.addIndex("plans", ["product_id", "slug"], { unique: true, name: "plans_product_slug_unique" });

    await queryInterface.createTable("plan_features", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      feature_code: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      feature_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      value: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.createTable("plan_limits", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      limit_code: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      limit_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      limit_value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      is_unlimited: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.createTable("addons", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pricing_type: {
        type: Sequelize.ENUM(
          "FLAT_MONTHLY",
          "FLAT_YEARLY",
          "PER_EMPLOYEE",
          "PER_USER",
          "PER_ASSET",
          "PER_EMAIL_CREDIT",
          "PER_LOCATION",
          "ONE_TIME",
        ),
        allowNull: false,
      },
      monthly_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      annual_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      unit_price: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      metadata_json: {
        type: Sequelize.JSON,
        allowNull: true,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable("coupons", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      discount_type: {
        type: Sequelize.ENUM("percent", "fixed"),
        allowNull: false,
      },
      discount_value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      applies_to_scope: {
        type: Sequelize.ENUM("all_products", "product", "plan"),
        allowNull: false,
        defaultValue: "all_products",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      starts_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ends_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      max_redemptions: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      redeemed_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.createTable("tax_settings", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tax_name: {
        type: Sequelize.STRING(120),
        allowNull: false,
        defaultValue: "GST",
      },
      tax_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 18,
      },
      gstin: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      sac: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_inclusive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.createTable("checkout_intents", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      intent_token: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "customer_accounts",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      billing_cycle: {
        type: Sequelize.ENUM("monthly", "semiannual", "annual", "biennial", "triennial"),
        allowNull: false,
      },
      coupon_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "coupons",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("active", "completed", "abandoned"),
        allowNull: false,
        defaultValue: "active",
      },
      source_route: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      selected_addons_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
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

    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subscription_number: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "customer_accounts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      billing_cycle: {
        type: Sequelize.ENUM("monthly", "semiannual", "annual", "biennial", "triennial"),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      renewal_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "trial", "active", "expiring", "expired", "suspended", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      base_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      addon_total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      setup_charge_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      auto_renew: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    await queryInterface.addIndex("subscriptions", ["customer_account_id", "product_id"], {
      unique: true,
      name: "subscriptions_customer_product_unique",
    });

    await queryInterface.createTable("subscription_addons", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      addon_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "addons",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "expired", "cancelled"),
        allowNull: false,
        defaultValue: "active",
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

    await queryInterface.createTable("subscription_usage", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      metric_code: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      used_value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      limit_value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      period_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      period_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: nowLiteral(Sequelize),
      },
    });

    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_number: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "customer_accounts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      lifecycle_type: {
        type: Sequelize.ENUM("new", "renewal", "upgrade", "addon"),
        allowNull: false,
        defaultValue: "new",
      },
      billing_cycle: {
        type: Sequelize.ENUM("monthly", "semiannual", "annual", "biennial", "triennial"),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      base_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      addon_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      setup_charge_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      gateway_provider: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: "sandbox",
      },
      gateway_order_id: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("draft", "pending_payment", "paid", "failed", "cancelled", "refunded"),
        allowNull: false,
        defaultValue: "draft",
      },
      selected_addons_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      coupon_code: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      metadata_json: {
        type: Sequelize.JSON,
        allowNull: true,
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

    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      payment_number: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "customer_accounts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      gateway_provider: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      gateway_transaction_id: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      gateway_payment_id: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "INR",
      },
      status: {
        type: Sequelize.ENUM("initiated", "success", "failed", "refunded"),
        allowNull: false,
        defaultValue: "initiated",
      },
      failure_reason: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      raw_response_json: {
        type: Sequelize.JSON,
        allowNull: true,
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

    await queryInterface.createTable("invoices", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_number: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      subscription_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      customer_account_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "customer_accounts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      company_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      plan_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      billing_period_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      billing_period_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subtotal_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      addon_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      setup_charge_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
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
      status: {
        type: Sequelize.ENUM("issued", "paid", "void", "refunded"),
        allowNull: false,
        defaultValue: "issued",
      },
      line_items_json: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      issued_at: {
        type: Sequelize.DATE,
        allowNull: false,
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

    const existingAccounts = await queryInterface.sequelize.query(
      "SELECT id, company_name FROM customer_accounts WHERE deleted_at IS NULL",
      { type: Sequelize.QueryTypes.SELECT },
    );

    for (const account of existingAccounts) {
      const companyName = account.company_name || `Company ${account.id}`;
      await queryInterface.bulkInsert(
        "companies",
        [
          {
            name: companyName,
            status: "active",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {},
      );

      const insertedCompany = await queryInterface.sequelize.query(
        "SELECT id FROM companies WHERE name = :companyName ORDER BY id DESC LIMIT 1",
        {
          replacements: { companyName },
          type: Sequelize.QueryTypes.SELECT,
        },
      );

      const companyId = insertedCompany[0]?.id;

      await queryInterface.sequelize.query(
        "UPDATE customer_accounts SET company_id = :companyId WHERE id = :accountId",
        {
          replacements: {
            companyId,
            accountId: account.id,
          },
        },
      );
    }

    const productIdByCode = {};
    const planIdByCode = {};

    for (const [productIndex, product] of productSeeds.entries()) {
      await queryInterface.bulkInsert(
        "products",
        [
          {
            name: product.name,
            code: product.code,
            slug: product.slug,
            description: product.description,
            icon: product.icon,
            status: "active",
            display_order: productIndex,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {},
      );

      const insertedProducts = await queryInterface.sequelize.query(
        "SELECT id FROM products WHERE code = :code LIMIT 1",
        {
          replacements: { code: product.code },
          type: Sequelize.QueryTypes.SELECT,
        },
      );

      const productId = insertedProducts[0]?.id;
      productIdByCode[product.code] = productId;

      for (const [planIndex, plan] of product.plans.entries()) {
        await queryInterface.bulkInsert(
          "plans",
          [
            {
              product_id: productId,
              name: plan.name,
              code: plan.code,
              slug: plan.slug,
              description: plan.description,
              monthly_price: plan.monthlyPrice,
              annual_price: plan.annualPrice,
              currency: "INR",
              status: "active",
              is_popular: plan.isPopular,
              display_order: planIndex,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          {},
        );

        const insertedPlans = await queryInterface.sequelize.query(
          "SELECT id FROM plans WHERE code = :code LIMIT 1",
          {
            replacements: { code: plan.code },
            type: Sequelize.QueryTypes.SELECT,
          },
        );

        const planId = insertedPlans[0]?.id;
        planIdByCode[plan.code] = planId;

        await queryInterface.bulkInsert(
          "plan_features",
          plan.features.map((feature, featureIndex) => ({
            plan_id: planId,
            feature_code: feature[0],
            feature_name: feature[1],
            description: null,
            value: null,
            enabled: true,
            display_order: featureIndex,
            created_at: new Date(),
            updated_at: new Date(),
          })),
          {},
        );

        await queryInterface.bulkInsert(
          "plan_limits",
          plan.limits.map((limit) => ({
            plan_id: planId,
            limit_code: limit[0],
            limit_name: limit[1],
            limit_value: limit[2],
            unit: limit[3],
            is_unlimited: false,
            created_at: new Date(),
            updated_at: new Date(),
          })),
          {},
        );
      }

      await queryInterface.bulkInsert(
        "addons",
        product.addons.map((addon, addonIndex) => ({
          product_id: productId,
          name: addon.name,
          code: addon.code,
          description: addon.description,
          pricing_type: addon.pricingType,
          monthly_price: addon.monthlyPrice ?? null,
          annual_price: addon.annualPrice ?? null,
          unit_price: addon.unitPrice ?? null,
          currency: "INR",
          status: "active",
          display_order: addonIndex,
          metadata_json: addon.metadata ? JSON.stringify(addon.metadata) : null,
          created_at: new Date(),
          updated_at: new Date(),
        })),
        {},
      );
    }

    await queryInterface.bulkInsert(
      "tax_settings",
      [
        {
          tax_name: "GST",
          tax_rate: 18,
          gstin: "27ABCDE1234F1Z5",
          sac: "998314",
          is_enabled: true,
          is_inclusive: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      "coupons",
      couponSeeds.map((coupon) => ({
        code: coupon.code,
        description: coupon.description,
        discount_type: coupon.discountType,
        discount_value: coupon.discountValue,
        applies_to_scope: coupon.appliesToScope,
        product_id: coupon.productCode ? productIdByCode[coupon.productCode] : null,
        plan_id: coupon.planCode ? planIdByCode[coupon.planCode] : null,
        status: "active",
        starts_at: null,
        ends_at: null,
        max_redemptions: null,
        redeemed_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("invoices");
    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("orders");
    await queryInterface.dropTable("subscription_usage");
    await queryInterface.dropTable("subscription_addons");
    await queryInterface.dropTable("subscriptions");
    await queryInterface.dropTable("checkout_intents");
    await queryInterface.dropTable("tax_settings");
    await queryInterface.dropTable("coupons");
    await queryInterface.dropTable("addons");
    await queryInterface.dropTable("plan_limits");
    await queryInterface.dropTable("plan_features");
    await queryInterface.dropTable("plans");
    await queryInterface.dropTable("products");
    await queryInterface.removeColumn("customer_accounts", "company_id");
    await queryInterface.dropTable("companies");
  },
};
