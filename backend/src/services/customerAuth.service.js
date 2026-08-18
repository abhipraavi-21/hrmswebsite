import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import env from "../config/env.js";
import { models, sequelize } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

export function serializeCustomerAccount(account) {
  return {
    id: account.id,
    username: account.username,
    companyId: account.company_id ?? account.company?.id ?? null,
    companyName: account.company?.name ?? account.company_name,
    contactName: account.contact_name,
    email: account.email,
    phone: account.phone,
    isActive: account.is_active,
    lastLoginAt: account.last_login_at,
  };
}

export function createCustomerAuthToken(account) {
  return jwt.sign(
    {
      username: account.username,
      role: "customer",
    },
    env.JWT_SECRET,
    {
      subject: String(account.id),
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );
}

async function ensureCustomerCompany(account, transaction) {
  if (account.company_id) {
    return account.company_id;
  }

  const company = await models.Company.create(
    {
      name: account.company_name || `Company ${account.id}`,
      status: "active",
    },
    transaction ? { transaction } : undefined,
  );

  await account.update(
    {
      company_id: company.id,
    },
    transaction ? { transaction } : undefined,
  );

  return company.id;
}

export async function registerCustomerAccount(payload) {
  const normalizedUsername = normalizeUsername(payload.username);
  const normalizedEmail = payload.email.trim().toLowerCase();
  const [existingUsername, existingEmail] = await Promise.all([
    models.CustomerAccount.findOne({
      where: {
        username: normalizedUsername,
      },
    }),
    models.CustomerAccount.findOne({
      where: {
        email: normalizedEmail,
      },
    }),
  ]);

  if (existingUsername) {
    throw new AppError("This username is already registered", 409);
  }

  if (existingEmail) {
    throw new AppError("This billing email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const now = new Date();
  const account = await sequelize.transaction(async (transaction) => {
    const company = await models.Company.create(
      {
        name: payload.companyName.trim(),
        status: "active",
      },
      { transaction },
    );

    return models.CustomerAccount.create(
      {
        username: normalizedUsername,
        email: normalizedEmail,
        password_hash: passwordHash,
        company_name: payload.companyName.trim(),
        contact_name: payload.contactName.trim(),
        phone: payload.phone?.trim() || null,
        company_id: company.id,
        is_active: true,
        last_login_at: now,
      },
      { transaction },
    );
  });

  return account;
}

export async function authenticateCustomerAccount(username, password) {
  const normalizedIdentifier = normalizeUsername(username);
  const account = await models.CustomerAccount.findOne({
    where: {
      [Op.or]: [
        { username: normalizedIdentifier },
        { email: normalizedIdentifier },
        { phone: username.trim() },
      ],
    },
  });

  if (!account || !account.is_active) {
    throw new AppError("Invalid username or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, account.password_hash);

  if (!passwordMatches) {
    throw new AppError("Invalid username or password", 401);
  }

  await sequelize.transaction(async (transaction) => {
    await ensureCustomerCompany(account, transaction);
    await account.update(
      {
        last_login_at: new Date(),
      },
      { transaction },
    );
  });

  return account;
}

export async function getCustomerAccountById(accountId) {
  const account = await models.CustomerAccount.findByPk(accountId, {
    include: [{ model: models.Company, as: "company" }],
  });

  if (!account || !account.is_active) {
    throw new AppError("Invalid or expired customer session", 401);
  }

  await ensureCustomerCompany(account);

  return account;
}
