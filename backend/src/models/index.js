import { initAdmin } from "./Admin.js";
import { initPage } from "./Page.js";
import { initPageSection } from "./PageSection.js";
import { initSectionItem } from "./SectionItem.js";
import { initResourcePage } from "./ResourcePage.js";
import { initPricingPlan } from "./PricingPlan.js";
import { initPricingFeature } from "./PricingFeature.js";
import { initContactSetting } from "./ContactSetting.js";
import { initContactEnquiry } from "./ContactEnquiry.js";
import { initMedia } from "./Media.js";
import { initActivityLog } from "./ActivityLog.js";

export default function initModels(sequelize) {
  const Admin = initAdmin(sequelize);
  const Page = initPage(sequelize);
  const PageSection = initPageSection(sequelize);
  const SectionItem = initSectionItem(sequelize);
  const ResourcePage = initResourcePage(sequelize);
  const PricingPlan = initPricingPlan(sequelize);
  const PricingFeature = initPricingFeature(sequelize);
  const ContactSetting = initContactSetting(sequelize);
  const ContactEnquiry = initContactEnquiry(sequelize);
  const Media = initMedia(sequelize);
  const ActivityLog = initActivityLog(sequelize);

  Page.hasMany(PageSection, { foreignKey: "page_id", as: "sections" });
  PageSection.belongsTo(Page, { foreignKey: "page_id", as: "page" });

  PageSection.hasMany(SectionItem, { foreignKey: "section_id", as: "items" });
  SectionItem.belongsTo(PageSection, { foreignKey: "section_id", as: "section" });

  Page.hasOne(ResourcePage, { foreignKey: "page_id", as: "resourcePage" });
  ResourcePage.belongsTo(Page, { foreignKey: "page_id", as: "page" });

  PricingPlan.hasMany(PricingFeature, { foreignKey: "pricing_plan_id", as: "features" });
  PricingFeature.belongsTo(PricingPlan, { foreignKey: "pricing_plan_id", as: "plan" });

  Admin.hasMany(ActivityLog, { foreignKey: "admin_id", as: "activityLogs" });
  ActivityLog.belongsTo(Admin, { foreignKey: "admin_id", as: "admin" });

  Admin.hasMany(Media, { foreignKey: "uploaded_by", as: "uploads" });
  Media.belongsTo(Admin, { foreignKey: "uploaded_by", as: "uploader" });

  return {
    Admin,
    Page,
    PageSection,
    SectionItem,
    ResourcePage,
    PricingPlan,
    PricingFeature,
    ContactSetting,
    ContactEnquiry,
    Media,
    ActivityLog,
  };
}
