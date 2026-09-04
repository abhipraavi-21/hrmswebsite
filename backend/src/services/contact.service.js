import { models } from "../config/database.js";

export async function getContactSettings() {
  let settings = await models.ContactSetting.findByPk(1);

  if (!settings) {
    settings = await models.ContactSetting.create({ id: 1 });
  }

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
