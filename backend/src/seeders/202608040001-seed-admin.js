const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

async function up(queryInterface) {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeThisPassword123!", 12);

  await queryInterface.bulkInsert(
    "admins",
    [
      {
        name: process.env.ADMIN_NAME || "Super Admin",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        password_hash: passwordHash,
        role: "super-admin",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {
      ignoreDuplicates: true,
    },
  );
}

async function down(queryInterface) {
  await queryInterface.bulkDelete(
    "admins",
    {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
    },
    {},
  );
}

module.exports = { up, down };
