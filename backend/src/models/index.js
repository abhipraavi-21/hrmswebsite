import { initAdmin } from "./Admin.js";
import { initPage } from "./Page.js";
import { initPageSection } from "./PageSection.js";
import { initSectionItem } from "./SectionItem.js";
import { initResourcePage } from "./ResourcePage.js";
import { initResourceVideo } from "./ResourceVideo.js";
import { initPricingPlan } from "./PricingPlan.js";
import { initPricingFeature } from "./PricingFeature.js";
import { initBlogPost } from "./BlogPost.js";
import { initContactSetting } from "./ContactSetting.js";
import { initContactEnquiry } from "./ContactEnquiry.js";
import { initMedia } from "./Media.js";
import { initActivityLog } from "./ActivityLog.js";
import { initSubscriptionPurchase } from "./SubscriptionPurchase.js";
import { initCustomerAccount } from "./CustomerAccount.js";
import { initCompany } from "./Company.js";
import { initProduct } from "./Product.js";
import { initPlan } from "./Plan.js";
import { initPlanFeature } from "./PlanFeature.js";
import { initPlanLimit } from "./PlanLimit.js";
import { initAddon } from "./Addon.js";
import { initCoupon } from "./Coupon.js";
import { initTaxSetting } from "./TaxSetting.js";
import { initCheckoutIntent } from "./CheckoutIntent.js";
import { initSubscription } from "./Subscription.js";
import { initSubscriptionAddon } from "./SubscriptionAddon.js";
import { initSubscriptionUsage } from "./SubscriptionUsage.js";
import { initOrder } from "./Order.js";
import { initPayment } from "./Payment.js";
import { initInvoice } from "./Invoice.js";

export default function initModels(sequelize) {
  const Admin = initAdmin(sequelize);
  const Page = initPage(sequelize);
  const PageSection = initPageSection(sequelize);
  const SectionItem = initSectionItem(sequelize);
  const ResourcePage = initResourcePage(sequelize);
  const ResourceVideo = initResourceVideo(sequelize);
  const PricingPlan = initPricingPlan(sequelize);
  const PricingFeature = initPricingFeature(sequelize);
  const BlogPost = initBlogPost(sequelize);
  const ContactSetting = initContactSetting(sequelize);
  const ContactEnquiry = initContactEnquiry(sequelize);
  const Media = initMedia(sequelize);
  const ActivityLog = initActivityLog(sequelize);
  const SubscriptionPurchase = initSubscriptionPurchase(sequelize);
  const CustomerAccount = initCustomerAccount(sequelize);
  const Company = initCompany(sequelize);
  const Product = initProduct(sequelize);
  const Plan = initPlan(sequelize);
  const PlanFeature = initPlanFeature(sequelize);
  const PlanLimit = initPlanLimit(sequelize);
  const Addon = initAddon(sequelize);
  const Coupon = initCoupon(sequelize);
  const TaxSetting = initTaxSetting(sequelize);
  const CheckoutIntent = initCheckoutIntent(sequelize);
  const Subscription = initSubscription(sequelize);
  const SubscriptionAddon = initSubscriptionAddon(sequelize);
  const SubscriptionUsage = initSubscriptionUsage(sequelize);
  const Order = initOrder(sequelize);
  const Payment = initPayment(sequelize);
  const Invoice = initInvoice(sequelize);

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

  Company.hasMany(CustomerAccount, { foreignKey: "company_id", as: "customerAccounts" });
  CustomerAccount.belongsTo(Company, { foreignKey: "company_id", as: "company" });

  Product.hasMany(Plan, { foreignKey: "product_id", as: "plans" });
  Plan.belongsTo(Product, { foreignKey: "product_id", as: "product" });

  Plan.hasMany(PlanFeature, { foreignKey: "plan_id", as: "features" });
  PlanFeature.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

  Plan.hasMany(PlanLimit, { foreignKey: "plan_id", as: "limits" });
  PlanLimit.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

  Product.hasMany(Addon, { foreignKey: "product_id", as: "addons" });
  Addon.belongsTo(Product, { foreignKey: "product_id", as: "product" });

  Product.hasMany(Coupon, { foreignKey: "product_id", as: "coupons" });
  Coupon.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Plan.hasMany(Coupon, { foreignKey: "plan_id", as: "coupons" });
  Coupon.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

  CustomerAccount.hasMany(CheckoutIntent, { foreignKey: "customer_account_id", as: "checkoutIntents" });
  CheckoutIntent.belongsTo(CustomerAccount, { foreignKey: "customer_account_id", as: "customerAccount" });
  Company.hasMany(CheckoutIntent, { foreignKey: "company_id", as: "checkoutIntents" });
  CheckoutIntent.belongsTo(Company, { foreignKey: "company_id", as: "company" });
  Product.hasMany(CheckoutIntent, { foreignKey: "product_id", as: "checkoutIntents" });
  CheckoutIntent.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Plan.hasMany(CheckoutIntent, { foreignKey: "plan_id", as: "checkoutIntents" });
  CheckoutIntent.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
  Coupon.hasMany(CheckoutIntent, { foreignKey: "coupon_id", as: "checkoutIntents" });
  CheckoutIntent.belongsTo(Coupon, { foreignKey: "coupon_id", as: "coupon" });

  CustomerAccount.hasMany(Subscription, { foreignKey: "customer_account_id", as: "subscriptions" });
  Subscription.belongsTo(CustomerAccount, { foreignKey: "customer_account_id", as: "customerAccount" });
  Company.hasMany(Subscription, { foreignKey: "company_id", as: "subscriptions" });
  Subscription.belongsTo(Company, { foreignKey: "company_id", as: "company" });
  Product.hasMany(Subscription, { foreignKey: "product_id", as: "subscriptions" });
  Subscription.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Plan.hasMany(Subscription, { foreignKey: "plan_id", as: "subscriptions" });
  Subscription.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });

  Subscription.hasMany(SubscriptionAddon, { foreignKey: "subscription_id", as: "addons" });
  SubscriptionAddon.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });
  Addon.hasMany(SubscriptionAddon, { foreignKey: "addon_id", as: "subscriptionAddons" });
  SubscriptionAddon.belongsTo(Addon, { foreignKey: "addon_id", as: "addon" });

  Subscription.hasMany(SubscriptionUsage, { foreignKey: "subscription_id", as: "usage" });
  SubscriptionUsage.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });

  CustomerAccount.hasMany(Order, { foreignKey: "customer_account_id", as: "orders" });
  Order.belongsTo(CustomerAccount, { foreignKey: "customer_account_id", as: "customerAccount" });
  Company.hasMany(Order, { foreignKey: "company_id", as: "orders" });
  Order.belongsTo(Company, { foreignKey: "company_id", as: "company" });
  Product.hasMany(Order, { foreignKey: "product_id", as: "orders" });
  Order.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Plan.hasMany(Order, { foreignKey: "plan_id", as: "orders" });
  Order.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
  Subscription.hasMany(Order, { foreignKey: "subscription_id", as: "orders" });
  Order.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });

  Order.hasMany(Payment, { foreignKey: "order_id", as: "payments" });
  Payment.belongsTo(Order, { foreignKey: "order_id", as: "order" });
  CustomerAccount.hasMany(Payment, { foreignKey: "customer_account_id", as: "payments" });
  Payment.belongsTo(CustomerAccount, { foreignKey: "customer_account_id", as: "customerAccount" });
  Company.hasMany(Payment, { foreignKey: "company_id", as: "payments" });
  Payment.belongsTo(Company, { foreignKey: "company_id", as: "company" });
  Product.hasMany(Payment, { foreignKey: "product_id", as: "payments" });
  Payment.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Subscription.hasMany(Payment, { foreignKey: "subscription_id", as: "payments" });
  Payment.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });

  Order.hasOne(Invoice, { foreignKey: "order_id", as: "invoice" });
  Invoice.belongsTo(Order, { foreignKey: "order_id", as: "order" });
  CustomerAccount.hasMany(Invoice, { foreignKey: "customer_account_id", as: "invoices" });
  Invoice.belongsTo(CustomerAccount, { foreignKey: "customer_account_id", as: "customerAccount" });
  Company.hasMany(Invoice, { foreignKey: "company_id", as: "invoices" });
  Invoice.belongsTo(Company, { foreignKey: "company_id", as: "company" });
  Product.hasMany(Invoice, { foreignKey: "product_id", as: "invoices" });
  Invoice.belongsTo(Product, { foreignKey: "product_id", as: "product" });
  Plan.hasMany(Invoice, { foreignKey: "plan_id", as: "invoices" });
  Invoice.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
  Subscription.hasMany(Invoice, { foreignKey: "subscription_id", as: "invoices" });
  Invoice.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });

  return {
    Admin,
    Page,
    PageSection,
    SectionItem,
    ResourcePage,
    ResourceVideo,
    PricingPlan,
    PricingFeature,
    BlogPost,
    ContactSetting,
    ContactEnquiry,
    Media,
    ActivityLog,
    SubscriptionPurchase,
    CustomerAccount,
    Company,
    Product,
    Plan,
    PlanFeature,
    PlanLimit,
    Addon,
    Coupon,
    TaxSetting,
    CheckoutIntent,
    Subscription,
    SubscriptionAddon,
    SubscriptionUsage,
    Order,
    Payment,
    Invoice,
  };
}
