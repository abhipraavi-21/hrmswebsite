import nodemailer from "nodemailer";
import env from "../config/env.js";

let transporter = null;

function isMailConfigured() {
  return Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS);
}

function getTransporter() {
  if (!isMailConfigured()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function buildSubscriptionEmailHtml(subscription) {
  const couponRow = subscription.couponCode
    ? `<tr><td style="padding:8px 0;color:#475569;">Coupon ${escapeHtml(
        subscription.couponCode,
      )}</td><td style="padding:8px 0;text-align:right;color:#047857;font-weight:700;">-${formatCurrency(
        subscription.discountAmount,
      )}</td></tr>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
        <div style="background:#0f62fe;color:#ffffff;padding:22px 26px;">
          <div style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;">Altroz HRMS</div>
          <h1 style="margin:10px 0 0;font-size:24px;">Subscription payment received</h1>
        </div>
        <div style="padding:26px;">
          <p style="margin:0 0 16px;">Hi ${escapeHtml(subscription.contactName)},</p>
          <p style="margin:0 0 20px;line-height:1.6;color:#334155;">
            Your ${escapeHtml(subscription.productName)} subscription has been activated for
            <strong>${escapeHtml(subscription.companyName)}</strong>.
          </p>

          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px 0;color:#475569;">Reference</td><td style="padding:8px 0;text-align:right;font-weight:700;">${escapeHtml(
              subscription.referenceCode,
            )}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Plan</td><td style="padding:8px 0;text-align:right;font-weight:700;">${escapeHtml(
              subscription.planName,
            )}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Billing cycle</td><td style="padding:8px 0;text-align:right;font-weight:700;">${escapeHtml(
              subscription.billingCycleLabel,
            )}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Employees</td><td style="padding:8px 0;text-align:right;font-weight:700;">${escapeHtml(
              subscription.employeeCount,
            )}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Subtotal</td><td style="padding:8px 0;text-align:right;font-weight:700;">${formatCurrency(
              subscription.subtotalAmount,
            )}</td></tr>
            ${couponRow}
            <tr><td style="padding:8px 0;color:#475569;">GST / Tax</td><td style="padding:8px 0;text-align:right;font-weight:700;">${formatCurrency(
              subscription.taxAmount,
            )}</td></tr>
            <tr><td style="padding:12px 0;border-top:1px solid #e2e8f0;font-size:18px;font-weight:800;">Total paid</td><td style="padding:12px 0;border-top:1px solid #e2e8f0;text-align:right;font-size:18px;font-weight:800;">${formatCurrency(
              subscription.totalAmount,
            )}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Renewal due</td><td style="padding:8px 0;text-align:right;font-weight:700;">${formatDate(
              subscription.renewalDate,
            )}</td></tr>
          </table>

          <p style="margin:20px 0 0;line-height:1.6;color:#334155;">
            Thank you for choosing Altroz. Keep this email for your subscription and billing records.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildSubscriptionEmailText(subscription) {
  return [
    "Altroz HRMS - Subscription payment received",
    "",
    `Hi ${subscription.contactName},`,
    `Your ${subscription.productName} subscription is active for ${subscription.companyName}.`,
    "",
    `Reference: ${subscription.referenceCode}`,
    `Plan: ${subscription.planName}`,
    `Billing cycle: ${subscription.billingCycleLabel}`,
    `Employees: ${subscription.employeeCount}`,
    `Subtotal: ${formatCurrency(subscription.subtotalAmount)}`,
    subscription.couponCode
      ? `Coupon ${subscription.couponCode}: -${formatCurrency(subscription.discountAmount)}`
      : null,
    `GST / Tax: ${formatCurrency(subscription.taxAmount)}`,
    `Total paid: ${formatCurrency(subscription.totalAmount)}`,
    `Renewal due: ${formatDate(subscription.renewalDate)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendSubscriptionPaymentEmail(subscription) {
  if (!subscription.email) {
    return { skipped: true, reason: "missing-recipient" };
  }

  const message = {
    from: env.MAIL_FROM,
    to: subscription.email,
    subject: `Subscription confirmed - ${subscription.planName}`,
    text: buildSubscriptionEmailText(subscription),
    html: buildSubscriptionEmailHtml(subscription),
  };

  const activeTransporter = getTransporter();

  if (!activeTransporter) {
    console.info("[mail:preview]", message);
    return { skipped: true, reason: "smtp-not-configured", preview: message };
  }

  return activeTransporter.sendMail(message);
}
