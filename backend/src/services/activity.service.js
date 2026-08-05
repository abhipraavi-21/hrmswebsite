import { models } from "../config/database.js";

export async function logActivity({
  adminId,
  action,
  entityType,
  entityId,
  description,
  oldValues,
  newValues,
  ipAddress,
}) {
  if (!adminId) {
    return;
  }

  await models.ActivityLog.create({
    admin_id: adminId,
    action,
    entity_type: entityType,
    entity_id: String(entityId),
    description,
    old_values_json: oldValues ?? null,
    new_values_json: newValues ?? null,
    ip_address: ipAddress ?? null,
  });
}
