import { Op } from "sequelize";
import { stringify } from "csv-stringify/sync";
import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

export function serializeEnquiry(enquiry, { includeNotes = true } = {}) {
  return {
    id: enquiry.id,
    fullName: enquiry.full_name,
    email: enquiry.email,
    phone: enquiry.phone,
    companyName: enquiry.company_name,
    subject: enquiry.subject,
    message: enquiry.message,
    sourcePage: enquiry.source_page,
    ipAddress: enquiry.ip_address,
    status: enquiry.status,
    adminNotes: includeNotes ? enquiry.admin_notes : undefined,
    submittedAt: enquiry.submitted_at,
    extraData: enquiry.extra_data_json ?? {},
    createdAt: enquiry.createdAt,
    updatedAt: enquiry.updatedAt,
  };
}

export async function getContactSettings() {
  let settings = await models.ContactSetting.findByPk(1);

  if (!settings) {
    settings = await models.ContactSetting.create({ id: 1 });
  }

  return settings;
}

export async function updateContactSettings(payload) {
  const settings = await getContactSettings();
  await settings.update({
    page_title: payload.pageTitle ?? settings.page_title,
    page_subtitle: payload.pageSubtitle ?? settings.page_subtitle,
    description: payload.description ?? settings.description,
    address: payload.address ?? settings.address,
    phone_primary: payload.phonePrimary ?? settings.phone_primary,
    phone_secondary: payload.phoneSecondary ?? settings.phone_secondary,
    email_primary: payload.emailPrimary ?? settings.email_primary,
    email_secondary: payload.emailSecondary ?? settings.email_secondary,
    business_hours: payload.businessHours ?? settings.business_hours,
    map_embed_url: payload.mapEmbedUrl ?? settings.map_embed_url,
    form_heading: payload.formHeading ?? settings.form_heading,
    form_description: payload.formDescription ?? settings.form_description,
    submit_button_text: payload.submitButtonText ?? settings.submit_button_text,
    success_message: payload.successMessage ?? settings.success_message,
    error_message: payload.errorMessage ?? settings.error_message,
    social_links_json: payload.socialLinks ?? settings.social_links_json,
    settings_json: payload.settings ?? settings.settings_json,
  });

  return settings;
}

export async function createEnquiry(payload, ipAddress) {
  const enquiry = await models.ContactEnquiry.create({
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone ?? null,
    company_name: payload.companyName ?? null,
    subject: payload.subject ?? null,
    message: payload.message,
    source_page: payload.sourcePage ?? null,
    ip_address: ipAddress ?? null,
    status: "new",
    extra_data_json: payload.extraData ?? {},
  });

  return enquiry;
}

export async function getEnquiryById(id) {
  const enquiry = await models.ContactEnquiry.findByPk(id);

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  return enquiry;
}

export async function listEnquiries({ search, status, dateFrom, dateTo, page = 1, limit = 20 }) {
  const where = {};

  if (search) {
    where[Op.or] = [
      { full_name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { company_name: { [Op.like]: `%${search}%` } },
      { message: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) {
    where.status = status;
  }

  if (dateFrom || dateTo) {
    where.submitted_at = {};

    if (dateFrom) {
      where.submitted_at[Op.gte] = new Date(dateFrom);
    }

    if (dateTo) {
      where.submitted_at[Op.lte] = new Date(dateTo);
    }
  }

  const offset = (page - 1) * limit;
  const { rows, count } = await models.ContactEnquiry.findAndCountAll({
    where,
    offset,
    limit,
    order: [["submitted_at", "DESC"]],
  });

  return {
    items: rows.map((item) => serializeEnquiry(item)),
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

export async function updateEnquiryStatus(id, status) {
  const enquiry = await getEnquiryById(id);
  await enquiry.update({ status });
  return enquiry;
}

export async function updateEnquiryNotes(id, adminNotes) {
  const enquiry = await getEnquiryById(id);
  await enquiry.update({ admin_notes: adminNotes });
  return enquiry;
}

export async function deleteEnquiry(id) {
  const enquiry = await getEnquiryById(id);
  await enquiry.destroy();
}

export async function bulkUpdateEnquiries(ids, status) {
  await models.ContactEnquiry.update(
    { status },
    { where: { id: ids } },
  );
}

export async function exportEnquiriesCsv(query) {
  const result = await listEnquiries({ ...query, page: 1, limit: 5000 });

  return stringify(
    result.items.map((item) => ({
      id: item.id,
      full_name: item.fullName,
      email: item.email,
      phone: item.phone,
      company_name: item.companyName,
      subject: item.subject,
      message: item.message,
      source_page: item.sourcePage,
      ip_address: item.ipAddress,
      status: item.status,
      submitted_at: item.submittedAt,
    })),
    {
      header: true,
    },
  );
}
