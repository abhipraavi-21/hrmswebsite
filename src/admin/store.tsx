import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { toast } from "sonner";

import { fetchAdminWorkspace, saveAdminWorkspace } from "@/lib/siteStateApi";

import { adminDemoPassword } from "./config";
import type {
  ActivityLog,
  AdminRole,
  AdminSessionUser,
  AdminStore,
  ContentRecord,
  ContentType,
  EmailCampaign,
  IntegrationSetting,
  LeadStatus,
  MediaAsset,
  NewsletterSubscriber,
  RedirectRecord,
  SeoRecord,
  SiteSettings,
  SubscriberStatus,
  UserRecord,
  WorkflowStatus,
} from "./types";

const STORE_KEY = "altroz-admin-store";
const THEME_KEY = "altroz-admin-theme";
const LOCAL_SESSION_KEY = "altroz-admin-session";
const SESSION_SESSION_KEY = "altroz-admin-session-temporary";
const ALT_TEXT_COVERAGE_WARNING = "One image block still needs alt text coverage.";
const HOME_PAGE_FEATURED_IMAGE = "/hrms-models/workforce-dashboard.png";
const HOME_PAGE_FEATURED_IMAGE_ALT =
  "Altroz HRMS dashboard preview showing workforce, attendance, and employee operations";

const initialStore: AdminStore = {
  content: [
    {
      id: "page-home",
      type: "Page",
      title: "Home",
      slug: "/",
      status: "Published",
      owner: "Sara Khan",
      updatedAt: "2026-08-03 18:20",
      publishedAt: "2026-07-12",
      summary: "Primary conversion landing page for HRMS, payroll, and bulk email traffic.",
      focusKeyword: "HRMS software",
      seoScore: 87,
      trafficShare: 28,
      readingTime: "5 min",
      sections: 8,
      tags: ["Hero", "CTA", "Pricing teaser"],
      featuredImage: HOME_PAGE_FEATURED_IMAGE,
      featuredImageAlt: HOME_PAGE_FEATURED_IMAGE_ALT,
    },
    {
      id: "page-pricing",
      type: "Page",
      title: "Pricing",
      slug: "/pricing",
      status: "Published",
      owner: "Avni Mehra",
      updatedAt: "2026-08-02 11:00",
      publishedAt: "2026-07-18",
      summary: "Plan comparison page with ROI calculator and pricing-focused schema.",
      focusKeyword: "HRMS pricing",
      seoScore: 81,
      trafficShare: 12,
      readingTime: "4 min",
      sections: 6,
      tags: ["Plans", "FAQ schema", "ROI"],
    },
    {
      id: "page-contact",
      type: "Page",
      title: "Contact",
      slug: "/company/contact-us",
      status: "Approved",
      owner: "Ria Das",
      updatedAt: "2026-08-04 08:40",
      summary: "Lead capture page with sales and support contact blocks.",
      focusKeyword: "contact HRMS team",
      seoScore: 74,
      trafficShare: 4,
      readingTime: "3 min",
      sections: 4,
      tags: ["Contact form", "Support", "Maps"],
    },
    {
      id: "blog-ai-seo",
      type: "Blog",
      title: "AI SEO Checklist for HRMS Websites",
      slug: "/resources/blog/ai-seo-checklist-hrms",
      category: "SEO",
      author: "Avni Mehra",
      status: "Published",
      owner: "Karan Bedi",
      updatedAt: "2026-08-04 09:10",
      publishedAt: "2026-08-04",
      summary: "Explains metadata, schema, and AI summary coverage for B2B HRMS pages.",
      focusKeyword: "HRMS SEO checklist",
      seoScore: 68,
      trafficShare: 7,
      readingTime: "10 min",
      sections: 12,
      tags: ["SEO", "AI Overviews", "Blogs"],
      featuredImage: "/blog/ai-seo-checklist.svg",
      featuredImageAlt: "AI SEO checklist illustration for HRMS content teams",
    },
    {
      id: "blog-payroll-errors",
      type: "Blog",
      title: "7 Payroll Errors Growing Teams Should Fix",
      slug: "/resources/blog/payroll-errors-growing-teams",
      category: "Payroll",
      author: "Nisha Verma",
      status: "Published",
      owner: "Nisha Verma",
      updatedAt: "2026-08-01 14:20",
      publishedAt: "2026-07-21",
      summary: "High-intent blog aimed at payroll automation and compliance searches.",
      focusKeyword: "payroll errors",
      seoScore: 84,
      trafficShare: 8,
      readingTime: "9 min",
      sections: 11,
      tags: ["Payroll", "Compliance", "Guide"],
      featuredImage: "/blog/payroll-errors.svg",
      featuredImageAlt: "Payroll operations illustration with warning markers",
    },
    {
      id: "blog-what-is-hrms",
      type: "Blog",
      title: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
      slug: "/resources/blog/what-is-hrms",
      category: "HR Software",
      author: "Altroz HR Editorial Team",
      status: "Published",
      owner: "Sara Khan",
      updatedAt: "2026-08-04 10:15",
      publishedAt: "2026-08-04",
      summary:
        "A practical guide to HRMS, how it works, and why Indian businesses use it to manage employees, payroll, attendance, leave, performance, and compliance in one place.",
      focusKeyword: "what is HRMS",
      seoScore: 91,
      trafficShare: 11,
      readingTime: "24 min",
      sections: 10,
      tags: ["HRMS", "Guide", "Core HR"],
      featuredImage: "/blog/what-is-hrms.svg",
      featuredImageAlt: "Abstract HRMS dashboard cover artwork",
    },
    {
      id: "learn-onboarding-playbook",
      type: "Learn Resource",
      title: "Employee Onboarding Playbook",
      slug: "/resources/learn/employee-onboarding-playbook",
      status: "Draft",
      owner: "Karan Bedi",
      updatedAt: "2026-08-03 16:30",
      summary: "Structured learn resource connected to onboarding workflows and checklists.",
      focusKeyword: "employee onboarding checklist",
      seoScore: 62,
      trafficShare: 3,
      readingTime: "12 min",
      sections: 9,
      tags: ["Onboarding", "Template", "Learning"],
    },
    {
      id: "learn-leave-policy",
      type: "Learn Resource",
      title: "Leave Policy Setup Guide",
      slug: "/resources/learn/leave-policy-setup-guide",
      status: "Approved",
      owner: "Ria Das",
      updatedAt: "2026-08-04 07:55",
      summary: "Helps HR admins configure leave policies without inconsistent approvals.",
      focusKeyword: "leave policy guide",
      seoScore: 76,
      trafficShare: 5,
      readingTime: "8 min",
      sections: 7,
      tags: ["Leave", "Policy", "Setup"],
    },
    {
      id: "compliance-pf",
      type: "Compliance Guide",
      title: "Provident Fund Compliance Guide",
      slug: "/resources/compliance-guides/provident-fund-compliance-guide",
      status: "Published",
      owner: "Nisha Verma",
      updatedAt: "2026-08-02 12:10",
      publishedAt: "2026-07-29",
      summary: "Long-form guide with state-specific notes and downloadable checklist.",
      focusKeyword: "PF compliance guide",
      seoScore: 82,
      trafficShare: 6,
      readingTime: "14 min",
      sections: 13,
      tags: ["Compliance", "PF", "Legal"],
    },
    {
      id: "compliance-gratuity",
      type: "Compliance Guide",
      title: "Gratuity Rule Update Tracker",
      slug: "/resources/compliance-guides/gratuity-rule-update-tracker",
      status: "Scheduled",
      owner: "Sara Khan",
      updatedAt: "2026-08-03 10:45",
      publishedAt: "2026-08-07",
      summary: "Versioned guide that tracks legal changes and frontend last-updated labels.",
      focusKeyword: "gratuity rules",
      seoScore: 71,
      trafficShare: 2,
      readingTime: "11 min",
      sections: 10,
      tags: ["Gratuity", "Versioning", "Scheduled"],
    },
    {
      id: "faq-pricing",
      type: "FAQ",
      title: "Pricing and Plan FAQs",
      slug: "/resources/faq/pricing-and-plan-faqs",
      status: "Published",
      owner: "Avni Mehra",
      updatedAt: "2026-07-31 17:05",
      publishedAt: "2026-07-20",
      summary: "Reusable pricing FAQ cluster mapped to pricing and demo intent pages.",
      focusKeyword: "HRMS pricing FAQ",
      seoScore: 79,
      trafficShare: 3,
      readingTime: "6 min",
      sections: 16,
      tags: ["FAQ", "Pricing", "Schema"],
    },
    {
      id: "faq-bulk-email",
      type: "FAQ",
      title: "Bulk Email Deliverability FAQ",
      slug: "/resources/faq/bulk-email-deliverability",
      status: "Archived",
      owner: "Ria Das",
      updatedAt: "2026-07-18 09:15",
      summary: "Older FAQ collection pending refresh for SMTP and sender reputation updates.",
      focusKeyword: "bulk email FAQ",
      seoScore: 55,
      trafficShare: 1,
      readingTime: "5 min",
      sections: 8,
      tags: ["Bulk Email", "Archived"],
    },
  ],
  seo: [
    {
      id: "seo-home",
      entityId: "page-home",
      entityType: "Page",
      seoTitle: "HRMS Software for Payroll, Attendance and Employee Management",
      metaTitle: "HRMS Software | Payroll, Attendance and Employee Management",
      metaDescription:
        "Explore Altroz HRMS for payroll, attendance, leave, employee records and bulk email operations from one secure platform.",
      slug: "/",
      canonicalUrl: "https://hrmswebsite-gamma.vercel.app/",
      focusKeyword: "HRMS software",
      secondaryKeywords: ["employee management software", "payroll software"],
      robots: "index, follow",
      ogTitle: "Altroz HRMS",
      ogDescription: "Manage payroll, attendance, and employee data from one dashboard.",
      schemaTypes: ["Organization", "SoftwareApplication", "FAQPage"],
      overallScore: 87,
      technicalScore: 90,
      contentScore: 84,
      aiScore: 86,
      warnings: [],
      lastUpdated: "2026-08-03 18:20",
    },
    {
      id: "seo-pricing",
      entityId: "page-pricing",
      entityType: "Page",
      seoTitle: "HRMS Pricing Plans with ROI Calculator",
      metaTitle: "HRMS Pricing Plans | ROI Calculator Included",
      metaDescription:
        "Compare plans, pricing, feature bundles and ROI for Altroz HRMS and bulk email modules.",
      slug: "/pricing",
      canonicalUrl: "https://hrmswebsite-gamma.vercel.app/pricing",
      focusKeyword: "HRMS pricing",
      secondaryKeywords: ["payroll pricing", "attendance pricing"],
      robots: "index, follow",
      ogTitle: "Pricing Plans for Altroz HRMS",
      ogDescription: "Compare plans and request a custom HRMS demo.",
      schemaTypes: ["Product", "Offer", "FAQPage"],
      overallScore: 81,
      technicalScore: 84,
      contentScore: 78,
      aiScore: 77,
      warnings: ["Meta description can be 10 to 20 characters longer."],
      lastUpdated: "2026-08-02 11:00",
    },
    {
      id: "seo-contact",
      entityId: "page-contact",
      entityType: "Page",
      seoTitle: "Contact Altroz HRMS Sales and Support",
      metaTitle: "Contact Altroz HRMS",
      metaDescription:
        "Get in touch with sales or support for HRMS, payroll, attendance and bulk email demos.",
      slug: "/company/contact-us",
      canonicalUrl: "https://hrmswebsite-gamma.vercel.app/company/contact-us",
      focusKeyword: "contact HRMS team",
      secondaryKeywords: ["book HRMS demo"],
      robots: "index, follow",
      ogTitle: "Contact Altroz",
      ogDescription: "Talk to our HRMS team for demos, support and partnerships.",
      schemaTypes: ["Organization", "BreadcrumbList"],
      overallScore: 74,
      technicalScore: 75,
      contentScore: 73,
      aiScore: 70,
      warnings: ["No FAQ schema attached to this lead page."],
      lastUpdated: "2026-08-04 08:40",
    },
    {
      id: "seo-ai-blog",
      entityId: "blog-ai-seo",
      entityType: "Blog",
      seoTitle: "AI SEO Checklist for HRMS Websites",
      metaTitle: "AI SEO Checklist for HRMS Websites",
      metaDescription:
        "Use this checklist to improve metadata, schema and AI summary readiness for HRMS content.",
      slug: "/resources/blog/ai-seo-checklist-hrms",
      canonicalUrl: "https://hrmswebsite-gamma.vercel.app/resources/blog/ai-seo-checklist-hrms",
      focusKeyword: "HRMS SEO checklist",
      secondaryKeywords: ["AI overview SEO", "B2B SaaS SEO"],
      semanticKeywords: ["entity SEO", "schema strategy", "AI search"],
      author: "Avni Mehra",
      twitterTitle: "AI SEO Checklist for HRMS Teams",
      twitterDescription:
        "Use this checklist to improve metadata, schema, and AI-answer readiness for HRMS content.",
      ogImage: "https://www.altrozhr.com/blog/ai-seo-checklist.svg",
      searchIntent: "Informational",
      primaryEntity: "HRMS SEO checklist",
      aiSummary:
        "A practical article covering metadata, schema, AI summaries, and entity signals for HRMS websites.",
      robots: "index, follow",
      ogTitle: "AI SEO Checklist",
      ogDescription: "A practical AI SEO checklist built for HRMS websites.",
      schemaJson: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "AI SEO Checklist for HRMS Websites",
  "author": {
    "@type": "Person",
    "name": "Avni Mehra"
  }
}`,
      schemaEnabled: true,
      schemaTypes: ["BlogPosting", "BreadcrumbList"],
      overallScore: 68,
      technicalScore: 72,
      contentScore: 66,
      aiScore: 64,
      warnings: ["Focus keyword is missing from H2 subheadings.", "Add FAQ schema section."],
      lastUpdated: "2026-08-04 09:10",
    },
    {
      id: "seo-payroll-errors",
      entityId: "blog-payroll-errors",
      entityType: "Blog",
      seoTitle: "7 Payroll Errors Growing Teams Should Fix",
      metaTitle: "7 Payroll Errors Growing Teams Should Fix",
      metaDescription:
        "A practical breakdown of the payroll mistakes that create rework, delays, and compliance risk for growing teams.",
      slug: "/resources/blog/payroll-errors-growing-teams",
      canonicalUrl:
        "https://hrmswebsite-gamma.vercel.app/resources/blog/payroll-errors-growing-teams",
      focusKeyword: "payroll errors",
      secondaryKeywords: ["payroll compliance mistakes", "salary processing errors"],
      semanticKeywords: ["payroll workflow", "salary accuracy", "compliance risk"],
      author: "Nisha Verma",
      twitterTitle: "7 Payroll Errors Growing Teams Should Fix",
      twitterDescription:
        "See the payroll mistakes that slow HR teams down and the process fixes that help avoid them.",
      ogImage: "https://www.altrozhr.com/blog/payroll-errors.svg",
      searchIntent: "Informational",
      primaryEntity: "payroll errors",
      aiSummary:
        "A blog post on the most common payroll errors, why they happen, and how process discipline reduces them.",
      robots: "index, follow",
      ogTitle: "7 Payroll Errors Growing Teams Should Fix",
      ogDescription: "Common payroll problems, their causes, and cleaner workflow fixes.",
      schemaJson: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "7 Payroll Errors Growing Teams Should Fix",
  "author": {
    "@type": "Person",
    "name": "Nisha Verma"
  }
}`,
      schemaEnabled: true,
      schemaTypes: ["BlogPosting", "BreadcrumbList"],
      overallScore: 84,
      technicalScore: 83,
      contentScore: 86,
      aiScore: 79,
      warnings: ["Add one more internal link to a compliance guide."],
      lastUpdated: "2026-08-01 14:20",
    },
    {
      id: "seo-what-is-hrms",
      entityId: "blog-what-is-hrms",
      entityType: "Blog",
      seoTitle: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
      metaTitle: "What is HRMS? The Complete Guide for Indian Businesses (2026)",
      metaDescription:
        "Learn what HRMS means, how it works, and why Indian businesses use it for payroll, attendance, leave, and employee management.",
      slug: "/resources/blog/what-is-hrms",
      canonicalUrl: "https://hrmswebsite-gamma.vercel.app/resources/blog/what-is-hrms",
      focusKeyword: "what is HRMS",
      secondaryKeywords: ["HRMS full form", "HRMS software guide"],
      semanticKeywords: ["employee management system", "HR automation", "cloud HRMS"],
      author: "Altroz HR Editorial Team",
      twitterTitle: "What is HRMS? A Complete Guide for Indian Businesses",
      twitterDescription:
        "A practical HRMS guide covering features, business use cases, and how modern teams replace spreadsheets.",
      ogImage: "https://www.altrozhr.com/blog/what-is-hrms.svg",
      searchIntent: "Informational",
      primaryEntity: "HRMS",
      aiSummary:
        "A long-form explainer on HRMS, the workflows it centralizes, and why it matters for growing teams in India.",
      robots: "index, follow",
      ogTitle: "What is HRMS?",
      ogDescription: "A practical HRMS guide for Indian businesses.",
      schemaJson: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "What is HRMS? The Complete Guide for Indian Businesses (2026)",
  "author": {
    "@type": "Organization",
    "name": "Altroz HR Editorial Team"
  }
}`,
      schemaEnabled: true,
      schemaTypes: ["BlogPosting", "BreadcrumbList", "FAQPage"],
      overallScore: 91,
      technicalScore: 92,
      contentScore: 90,
      aiScore: 89,
      warnings: ["Consider adding an updated screenshot to the hero image."],
      lastUpdated: "2026-08-04 10:15",
    },
    {
      id: "seo-leave-guide",
      entityId: "learn-leave-policy",
      entityType: "Learn Resource",
      seoTitle: "Leave Policy Setup Guide for HR Teams",
      metaTitle: "Leave Policy Setup Guide",
      metaDescription:
        "Step-by-step leave policy setup guide for HR teams managing approvals, balances and rules.",
      slug: "/resources/learn/leave-policy-setup-guide",
      canonicalUrl:
        "https://hrmswebsite-gamma.vercel.app/resources/learn/leave-policy-setup-guide",
      focusKeyword: "leave policy guide",
      secondaryKeywords: ["leave setup", "HR leave rules"],
      robots: "index, follow",
      ogTitle: "Leave Policy Setup Guide",
      ogDescription: "Configure leave rules and approvals with fewer manual follow-ups.",
      schemaTypes: ["CollectionPage"],
      overallScore: 76,
      technicalScore: 78,
      contentScore: 75,
      aiScore: 71,
      warnings: ["Canonical can be shortened by removing tracking params in preview."],
      lastUpdated: "2026-08-04 07:55",
    },
  ],
  media: [
    {
      id: "media-home-hero",
      name: "home-hero-dashboard.webp",
      type: "Image",
      mimeType: "image/webp",
      sizeLabel: "324 KB",
      dimensions: "1440x960",
      altText: "Altroz HRMS dashboard hero preview",
      title: "Home hero dashboard",
      caption: "Main website hero image",
      description: "Used on the public homepage hero section.",
      uploadedBy: "Sara Khan",
      uploadedAt: "2026-08-01 13:00",
      usage: "Homepage hero",
      url: "/admin-media/home-hero-dashboard.webp",
    },
    {
      id: "media-pricing-og",
      name: "pricing-open-graph.png",
      type: "Image",
      mimeType: "image/png",
      sizeLabel: "512 KB",
      dimensions: "1200x630",
      altText: "Pricing page social card",
      title: "Pricing OG image",
      caption: "Social preview",
      description: "Open Graph preview for pricing campaigns.",
      uploadedBy: "Avni Mehra",
      uploadedAt: "2026-07-29 10:15",
      usage: "Pricing SEO",
      url: "/admin-media/pricing-open-graph.png",
    },
    {
      id: "media-pf-guide",
      name: "pf-compliance-checklist.pdf",
      type: "PDF",
      mimeType: "application/pdf",
      sizeLabel: "1.4 MB",
      dimensions: "A4",
      altText: "Provident fund compliance checklist PDF",
      title: "PF checklist",
      caption: "Downloadable compliance file",
      description: "PDF linked from the compliance guide landing page.",
      uploadedBy: "Nisha Verma",
      uploadedAt: "2026-07-28 15:50",
      usage: "Compliance guide download",
      url: "/admin-media/pf-compliance-checklist.pdf",
    },
  ],
  leads: [
    {
      id: "lead-demo-1",
      kind: "Demo Request",
      name: "Aman Jain",
      email: "aman@finly.io",
      phone: "+91 9876543210",
      company: "Finly",
      source: "Pricing page",
      status: "Qualified",
      assignedTo: "Sara Khan",
      submittedAt: "2026-08-04 09:05",
      message: "Need payroll + attendance for 240 employees across 4 branches.",
      internalNotes: ["Wants custom onboarding support.", "Follow up after product comparison."],
      product: "HRMS + Payroll",
      utmSource: "google",
      utmCampaign: "pricing-intent",
    },
    {
      id: "lead-demo-2",
      kind: "Demo Request",
      name: "Pooja Nair",
      email: "pooja@primecare.org",
      phone: "+91 9988776655",
      company: "PrimeCare",
      source: "Book demo page",
      status: "Demo scheduled",
      assignedTo: "Avni Mehra",
      submittedAt: "2026-08-03 16:22",
      message: "Interested in employee self service and leave workflows.",
      internalNotes: ["Demo booked for Aug 6, 2026."],
      product: "Core HR + Leave",
      utmSource: "linkedin",
      utmCampaign: "brand-demo",
    },
    {
      id: "lead-demo-3",
      kind: "Demo Request",
      name: "Rakesh Menon",
      email: "rakesh@techloom.com",
      phone: "+91 9090909090",
      company: "TechLoom",
      source: "Blog CTA",
      status: "New",
      assignedTo: "Unassigned",
      submittedAt: "2026-08-04 07:35",
      message: "Need asset and onboarding workflow demo.",
      internalNotes: [],
      product: "Asset Management",
      utmSource: "organic",
      utmCampaign: "blog-seo",
    },
    {
      id: "lead-contact-1",
      kind: "Contact Enquiry",
      name: "Nitin Solanki",
      email: "nitin@fleetbridge.com",
      phone: "+91 9812312312",
      company: "FleetBridge",
      source: "Contact page",
      status: "Contacted",
      assignedTo: "Sara Khan",
      submittedAt: "2026-08-03 12:12",
      message: "Looking for branch-wise attendance and reporting.",
      internalNotes: ["Sent brochure and ROI calculator."],
      product: "Attendance",
      utmSource: "direct",
      utmCampaign: "contact",
    },
    {
      id: "lead-contact-2",
      kind: "Contact Enquiry",
      name: "Mitali Roy",
      email: "mitali@elevatehr.in",
      phone: "+91 9345656789",
      company: "Elevate HR",
      source: "Footer form",
      status: "New",
      assignedTo: "Unassigned",
      submittedAt: "2026-08-04 08:10",
      message: "Need pricing details for email campaigns and SMTP setup.",
      internalNotes: [],
      product: "Bulk Email",
      utmSource: "newsletter",
      utmCampaign: "footer-conversion",
    },
  ],
  newsletterSubscribers: [
    {
      id: "sub-1",
      email: "anika@softline.io",
      name: "Anika Rao",
      source: "Blog subscribe",
      status: "Active",
      subscribedAt: "2026-08-02",
      lastCampaign: "August product digest",
    },
    {
      id: "sub-2",
      email: "ops@woodlandservices.in",
      name: "Woodland Ops",
      source: "Footer signup",
      status: "Active",
      subscribedAt: "2026-08-01",
      lastCampaign: "Compliance update",
    },
    {
      id: "sub-3",
      email: "hello@peoplepilot.ai",
      name: "People Pilot",
      source: "Pricing CTA",
      status: "Bounced",
      subscribedAt: "2026-07-27",
      lastCampaign: "July roundup",
    },
  ],
  emailCampaigns: [
    {
      id: "campaign-1",
      name: "August product digest",
      subject: "What changed in Altroz HRMS this month",
      audience: "Active subscribers",
      scheduledFor: "2026-08-05 10:00",
      status: "Scheduled",
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
    },
    {
      id: "campaign-2",
      name: "Compliance update",
      subject: "New PF and gratuity guide updates",
      audience: "Compliance readers",
      scheduledFor: "2026-08-01 11:00",
      status: "Sent",
      sentCount: 481,
      openCount: 242,
      clickCount: 58,
    },
    {
      id: "campaign-3",
      name: "Pricing nurture",
      subject: "Need help choosing the right HRMS plan?",
      audience: "Pricing page leads",
      scheduledFor: "2026-08-06 15:30",
      status: "Draft",
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
    },
  ],
  redirects: [
    {
      id: "redirect-1",
      sourceUrl: "/about-us",
      destinationUrl: "/company/about-us",
      type: 301,
      active: true,
      hits: 184,
      createdAt: "2026-07-17",
      lastAccessed: "2026-08-04 09:02",
    },
    {
      id: "redirect-2",
      sourceUrl: "/faq",
      destinationUrl: "/resources/faq",
      type: 301,
      active: true,
      hits: 131,
      createdAt: "2026-07-18",
      lastAccessed: "2026-08-04 08:44",
    },
    {
      id: "redirect-3",
      sourceUrl: "/bulk-email/campaigns",
      destinationUrl: "/bulk-email",
      type: 302,
      active: false,
      hits: 22,
      createdAt: "2026-07-30",
      lastAccessed: "2026-08-02 13:18",
    },
  ],
  brokenLinks: [
    {
      id: "broken-1",
      sourcePage: "AI SEO Checklist for HRMS Websites",
      brokenUrl: "https://example.com/old-ga-guide",
      linkType: "External",
      httpStatus: 404,
      lastChecked: "2026-08-04 06:15",
      fixStatus: "Open",
    },
    {
      id: "broken-2",
      sourcePage: "Provident Fund Compliance Guide",
      brokenUrl: "/resources/learn/checklist-for-epf-registration",
      linkType: "Internal",
      httpStatus: 404,
      lastChecked: "2026-08-04 06:15",
      fixStatus: "In progress",
    },
  ],
  analytics: [
    { month: "Mar", demoRequests: 42, organicTraffic: 6200, pagesPublished: 4 },
    { month: "Apr", demoRequests: 51, organicTraffic: 7100, pagesPublished: 5 },
    { month: "May", demoRequests: 56, organicTraffic: 7860, pagesPublished: 6 },
    { month: "Jun", demoRequests: 63, organicTraffic: 8420, pagesPublished: 7 },
    { month: "Jul", demoRequests: 71, organicTraffic: 9130, pagesPublished: 8 },
    { month: "Aug", demoRequests: 29, organicTraffic: 4010, pagesPublished: 3 },
  ],
  devices: [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 33 },
    { name: "Tablet", value: 9 },
  ],
  seoDistribution: [
    { label: "Excellent", count: 8 },
    { label: "Good", count: 10 },
    { label: "Needs improvement", count: 4 },
    { label: "Poor", count: 2 },
  ],
  topPages: [
    { title: "Home", visits: 12480, conversions: 214 },
    { title: "Pricing", visits: 5210, conversions: 169 },
    { title: "Payroll Errors Blog", visits: 3930, conversions: 48 },
    { title: "Provident Fund Guide", visits: 3450, conversions: 56 },
  ],
  users: [
    {
      id: "user-1",
      name: "Sara Khan",
      email: "sara@altrozhr.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2026-08-04 09:18",
      avatar: "SK",
    },
    {
      id: "user-2",
      name: "Avni Mehra",
      email: "avni@altrozhr.com",
      role: "SEO Manager",
      status: "Active",
      lastLogin: "2026-08-04 08:32",
      avatar: "AM",
    },
    {
      id: "user-3",
      name: "Karan Bedi",
      email: "karan@altrozhr.com",
      role: "Content Writer",
      status: "Active",
      lastLogin: "2026-08-03 18:05",
      avatar: "KB",
    },
    {
      id: "user-4",
      name: "Ria Das",
      email: "ria@altrozhr.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2026-08-04 07:40",
      avatar: "RD",
    },
    {
      id: "user-5",
      name: "Nisha Verma",
      email: "nisha@altrozhr.com",
      role: "Client Admin",
      status: "Pending",
      lastLogin: "2026-08-02 16:11",
      avatar: "NV",
    },
  ],
  activities: [
    {
      id: "act-1",
      user: "Sara Khan",
      action: "Publish",
      module: "Pages",
      description: "Published the Pricing page conversion updates.",
      ipAddress: "122.160.14.9",
      userAgent: "Chrome 138 / Windows",
      dateTime: "2026-08-04 09:12",
    },
    {
      id: "act-2",
      user: "Avni Mehra",
      action: "Update",
      module: "SEO",
      description: "Adjusted canonical and schema settings for the Home page.",
      ipAddress: "122.160.14.10",
      userAgent: "Edge 138 / Windows",
      dateTime: "2026-08-04 08:57",
    },
    {
      id: "act-3",
      user: "Ria Das",
      action: "Approve",
      module: "Blog Management",
      description: "Approved the AI SEO checklist article for editorial pass.",
      ipAddress: "122.160.14.11",
      userAgent: "Chrome 138 / macOS",
      dateTime: "2026-08-04 08:41",
    },
    {
      id: "act-4",
      user: "Sara Khan",
      action: "Assign",
      module: "Demo Requests",
      description: "Assigned Finly demo lead to Avni Mehra.",
      ipAddress: "122.160.14.9",
      userAgent: "Chrome 138 / Windows",
      dateTime: "2026-08-04 07:55",
    },
  ],
  notifications: [
    {
      id: "note-1",
      title: "Pricing page metadata needs approval",
      description: "Editor approval is pending before publication.",
      createdAt: "5 min ago",
      priority: "High",
      unread: true,
    },
    {
      id: "note-2",
      title: "New demo request from Finly",
      description: "Pricing page conversion with high-intent payroll requirements.",
      createdAt: "18 min ago",
      priority: "High",
      unread: true,
    },
    {
      id: "note-3",
      title: "Broken link checker found 2 issues",
      description: "One external and one internal resource need fixes.",
      createdAt: "1 hr ago",
      priority: "Medium",
      unread: false,
    },
  ],
  integrations: [
    {
      id: "ga4",
      label: "Google Analytics 4",
      value: "G-9XH4C7A2M1",
      helper: "Measurement ID",
      status: "Connected",
      enabled: true,
      lastSync: "2026-08-04 08:00",
    },
    {
      id: "gtm",
      label: "Google Tag Manager",
      value: "GTM-ALTROZ42",
      helper: "Container ID",
      status: "Connected",
      enabled: true,
      lastSync: "2026-08-04 08:00",
    },
    {
      id: "gsc",
      label: "Google Search Console",
      value: "Verification code stored",
      helper: "Verification code",
      status: "Not configured",
      enabled: false,
      lastSync: "Never",
    },
    {
      id: "clarity",
      label: "Microsoft Clarity",
      value: "clr-29x88",
      helper: "Project ID",
      status: "Connected",
      enabled: true,
      lastSync: "2026-08-03 22:10",
    },
    {
      id: "pixel",
      label: "Meta Pixel",
      value: "Not saved",
      helper: "Pixel ID",
      status: "Error",
      enabled: false,
      lastSync: "2026-07-31 18:00",
    },
  ],
  siteSettings: {
    companyName: "Altroz HR",
    supportEmail: "support@altrozhr.com",
    salesEmail: "sales@altrozhr.com",
    defaultMetaDescription:
      "Altroz HR helps businesses manage payroll, attendance, employee records, compliance, and bulk email workflows from one platform.",
    canonicalBaseUrl: "https://hrmswebsite-gamma.vercel.app",
    autoSave: true,
    darkModeDefault: false,
  },
  robotsTxt: `User-agent: *
Allow: /

Sitemap: https://hrmswebsite-gamma.vercel.app/sitemap.xml`,
  sitemap: {
    status: "Healthy",
    lastGenerated: "2026-08-04 07:00",
    includedPages: 24,
    includedBlogs: 18,
    includedResources: 14,
    priorityMode: "Balanced",
    changeFrequency: "Weekly",
  },
};

type AdminContextValue = {
  store: AdminStore;
  sessionUser: AdminSessionUser | null;
  theme: "light" | "dark";
  counts: Record<string, number>;
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  createContentRecord: (record: Omit<ContentRecord, "id" | "updatedAt">) => string;
  deleteContentRecord: (id: string) => void;
  updateContentRecord: (
    id: string,
    updates: Partial<ContentRecord>,
    options?: { silent?: boolean; action?: string; activityDescription?: string },
  ) => void;
  updateContentStatus: (id: string, status: WorkflowStatus) => void;
  updateSeoRecord: (
    id: string,
    updates: Partial<SeoRecord>,
    options?: { silent?: boolean; action?: string; activityDescription?: string },
  ) => void;
  bulkUpdateSeoRecords: (ids: string[], updates: Partial<SeoRecord>) => void;
  importSeoRows: (rows: Array<Partial<SeoRecord> & { slug: string }>) => void;
  bulkFillFeaturedAltText: () => void;
  addMediaAssets: (files: File[]) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadAssignee: (id: string, assignee: string) => void;
  updateSubscriberStatus: (id: string, status: SubscriberStatus) => void;
  updateCampaignStatus: (id: string, status: EmailCampaign["status"]) => void;
  addRedirect: (redirect: Omit<RedirectRecord, "id" | "createdAt" | "lastAccessed" | "hits">) => void;
  addRedirectBatch: (redirects: Array<Omit<RedirectRecord, "id" | "createdAt" | "lastAccessed" | "hits">>) => void;
  toggleRedirect: (id: string) => void;
  updateIntegration: (id: string, updates: Partial<IntegrationSetting>) => void;
  updateSiteSettings: (updates: Partial<SiteSettings>) => void;
  saveRobotsTxt: (content: string) => void;
  restoreRobotsDefault: () => void;
  regenerateSitemap: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateUserStatus: (id: string, status: UserRecord["status"]) => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

function readSession(): AdminSessionUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(LOCAL_SESSION_KEY) ?? sessionStorage.getItem(SESSION_SESSION_KEY);
  return raw ? (JSON.parse(raw) as AdminSessionUser) : null;
}

function appendActivity(
  store: AdminStore,
  entry: Omit<ActivityLog, "id" | "dateTime">,
): AdminStore {
  const nextActivity: ActivityLog = {
    id: `act-${Date.now()}`,
    dateTime: new Date().toISOString().slice(0, 16).replace("T", " "),
    ...entry,
  };

  return { ...store, activities: [nextActivity, ...store.activities].slice(0, 30) };
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function formatAdminTimestamp(date = new Date()) {
  return date.toISOString().slice(0, 16).replace("T", " ");
}

function formatAdminDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function normalizeSlug(slug: string) {
  if (!slug) {
    return "/";
  }

  if (/^https?:\/\//i.test(slug)) {
    return slug;
  }

  return slug.startsWith("/") ? slug : `/${slug}`;
}

function buildCanonicalUrl(baseUrl: string, slug: string) {
  if (/^https?:\/\//i.test(slug)) {
    return slug;
  }

  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedSlug = normalizeSlug(slug);
  return normalizedSlug === "/" ? `${normalizedBase}/` : `${normalizedBase}${normalizedSlug}`;
}

function getDefaultSchemaTypes(type: ContentType, slug: string) {
  if (type === "Page" && slug === "/pricing") {
    return ["Product", "Offer", "FAQPage"];
  }

  switch (type) {
    case "Page":
      return ["WebPage", "BreadcrumbList"];
    case "Learn Resource":
      return ["CollectionPage", "BreadcrumbList"];
    case "Compliance Guide":
      return ["Article", "FAQPage"];
    case "FAQ":
      return ["FAQPage", "BreadcrumbList"];
    case "Blog":
      return ["BlogPosting", "BreadcrumbList"];
    default:
      return ["WebPage"];
  }
}

function normalizeAdminStore(store: AdminStore): AdminStore {
  const normalizedContent = store.content.map((item) => {
    if (item.id !== "page-home") {
      return item;
    }

    return {
      ...item,
      featuredImage: item.featuredImage || HOME_PAGE_FEATURED_IMAGE,
      featuredImageAlt: item.featuredImageAlt?.trim() || HOME_PAGE_FEATURED_IMAGE_ALT,
    };
  });

  const contentById = new Map(normalizedContent.map((item) => [item.id, item]));
  const normalizedSeo = store.seo.map((item) => {
    const linkedContent = contentById.get(item.entityId);
    const nextWarnings = item.warnings.filter(
      (warning) =>
        warning !== ALT_TEXT_COVERAGE_WARNING ||
        !(linkedContent?.featuredImage && linkedContent.featuredImageAlt?.trim()),
    );

    if (item.id !== "seo-home") {
      return nextWarnings === item.warnings ? item : { ...item, warnings: nextWarnings };
    }

    return {
      ...item,
      ogImage: item.ogImage || linkedContent?.featuredImage,
      twitterImage: item.twitterImage || linkedContent?.featuredImage,
      linkedInImage: item.linkedInImage || linkedContent?.featuredImage,
      whatsAppImage: item.whatsAppImage || linkedContent?.featuredImage,
      warnings: nextWarnings,
    };
  });

  return {
    ...store,
    content: normalizedContent,
    seo: normalizedSeo,
  };
}

const normalizedInitialStore = normalizeAdminStore(initialStore);

function syncSitemapCounts(store: AdminStore): AdminStore {
  return {
    ...store,
    sitemap: {
      ...store.sitemap,
      includedPages: store.content.filter((item) => item.type === "Page").length,
      includedBlogs: store.content.filter((item) => item.type === "Blog").length,
      includedResources: store.content.filter((item) => item.type !== "Page" && item.type !== "Blog").length,
    },
  };
}

function createSeoRecordFromContent(
  record: ContentRecord,
  canonicalBaseUrl: string,
  timestamp: string,
): SeoRecord {
  const schemaTypes = getDefaultSchemaTypes(record.type, record.slug);
  const canonicalUrl = buildCanonicalUrl(canonicalBaseUrl, record.slug);
  const metaDescription = record.summary.slice(0, 160);

  return {
    id: `seo-${record.id}`,
    entityId: record.id,
    entityType: record.type,
    seoTitle: record.title,
    metaTitle: record.title,
    metaDescription,
    slug: record.slug,
    canonicalUrl,
      focusKeyword: record.focusKeyword,
      secondaryKeywords: record.tags.slice(0, 3),
      semanticKeywords: record.tags,
      searchIntent: record.type === "Page" ? "Commercial investigation" : "Informational",
      contentIntent: record.type === "Page" ? "Conversion" : "Education",
      primaryEntity: record.focusKeyword,
      aiSummary: record.summary,
      publishDate: record.publishedAt,
      readingTime: record.readingTime,
      author: record.author ?? record.owner,
      twitterTitle: record.title,
      twitterDescription: metaDescription,
      twitterImage: record.featuredImage,
      linkedInTitle: record.title,
      linkedInDescription: metaDescription,
      linkedInImage: record.featuredImage,
      whatsAppTitle: record.title,
      whatsAppDescription: metaDescription,
      whatsAppImage: record.featuredImage,
      ogImage: record.featuredImage,
      robots: "index, follow",
      ogTitle: record.title,
    ogDescription: metaDescription,
    schemaTypes,
    schemaJson: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": schemaTypes[0] ?? "WebPage",
        name: record.title,
        url: canonicalUrl,
        description: metaDescription,
      },
      null,
      2,
    ),
    schemaEnabled: true,
    overallScore: record.seoScore,
    technicalScore: Math.max(60, Math.min(100, record.seoScore + 4)),
    contentScore: record.seoScore,
    aiScore: Math.max(55, Math.min(100, record.seoScore - 3)),
    warnings: ["Review metadata, schema, and internal linking before publishing."],
    lastUpdated: timestamp,
  };
}

function buildCounts(store: AdminStore) {
  return {
    pages: store.content.filter((item) => item.type === "Page").length,
    blogs: store.content.filter((item) => item.type === "Blog").length,
    demoRequests: store.leads.filter((lead) => lead.kind === "Demo Request").length,
    contactEnquiries: store.leads.filter((lead) => lead.kind === "Contact Enquiry").length,
    newsletter: store.newsletterSubscribers.length,
    activities: store.activities.length,
    unreadNotifications: store.notifications.filter((item) => item.unread).length,
  };
}

export function AdminProvider({ children }: PropsWithChildren) {
  const [store, setStore] = useState<AdminStore>(() => {
    if (typeof window === "undefined") {
      return normalizedInitialStore;
    }

    const raw = localStorage.getItem(STORE_KEY);
    return raw ? normalizeAdminStore(JSON.parse(raw) as AdminStore) : normalizedInitialStore;
  });
  const [sessionUser, setSessionUser] = useState<AdminSessionUser | null>(() => readSession());
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const saved = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    return saved ?? (normalizedInitialStore.siteSettings.darkModeDefault ? "dark" : "light");
  });
  const [hasLoadedRemoteWorkspace, setHasLoadedRemoteWorkspace] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [store]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!sessionUser) {
      setHasLoadedRemoteWorkspace(false);
      return;
    }

    let active = true;
    setHasLoadedRemoteWorkspace(false);

    void fetchAdminWorkspace(sessionUser.role)
      .then((remoteWorkspace) => {
        if (!active) {
          return;
        }

        if (remoteWorkspace) {
          setStore(normalizeAdminStore(remoteWorkspace));
        }

        setHasLoadedRemoteWorkspace(true);
      })
      .catch(() => {
        if (active) {
          setHasLoadedRemoteWorkspace(true);
        }
      });

    return () => {
      active = false;
    };
  }, [sessionUser]);

  useEffect(() => {
    if (!sessionUser || !hasLoadedRemoteWorkspace) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveAdminWorkspace(sessionUser.role, store).catch(() => {
        // Keep local persistence as the fallback even if the API is unavailable.
      });
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [hasLoadedRemoteWorkspace, sessionUser, store]);

  const counts = useMemo(() => buildCounts(store), [store]);

  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      const user = store.users.find((item) => item.email.toLowerCase() === email.toLowerCase());

      if (!user || password !== adminDemoPassword) {
        toast.error("Invalid credentials. Use one of the seeded admin emails and the demo password.");
        return false;
      }

      if (user.status === "Disabled") {
        toast.error("This account is disabled.");
        return false;
      }

      const nextSession: AdminSessionUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      };

      if (remember) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(nextSession));
        sessionStorage.removeItem(SESSION_SESSION_KEY);
      } else {
        sessionStorage.setItem(SESSION_SESSION_KEY, JSON.stringify(nextSession));
        localStorage.removeItem(LOCAL_SESSION_KEY);
      }

      setSessionUser(nextSession);
      setStore((prev) =>
        appendActivity(
          {
            ...prev,
            users: prev.users.map((item) =>
              item.id === user.id && item.status === "Pending" ? { ...item, status: "Active" } : item,
            ),
          },
          {
            user: user.name,
            action: "Login",
            module: "Authentication",
            description:
              user.status === "Pending"
                ? "Signed into the admin workspace and activated the invited demo account."
                : "Signed into the admin workspace.",
            ipAddress: "127.0.0.1",
            userAgent: "Current browser session",
          },
        ),
      );
      if (user.status === "Pending") {
        toast.success(`Welcome, ${user.name}. This invited account is now active in demo mode.`);
        return true;
      }
      toast.success(`Welcome back, ${user.name}.`);
      return true;
    },
    [store.users],
  );

  const logout = useCallback(() => {
    const currentUser = sessionUser;
    localStorage.removeItem(LOCAL_SESSION_KEY);
    sessionStorage.removeItem(SESSION_SESSION_KEY);
    setSessionUser(null);

    if (currentUser) {
      setStore((prev) =>
        appendActivity(prev, {
          user: currentUser.name,
          action: "Logout",
          module: "Authentication",
          description: "Ended the current admin session.",
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        }),
      );
    }
  }, [sessionUser]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const createContentRecord = useCallback(
    (record: Omit<ContentRecord, "id" | "updatedAt">) => {
      const now = new Date();
      const timestamp = formatAdminTimestamp(now);
      const publishedAt =
        record.publishedAt || (record.status === "Published" ? formatAdminDate(now) : undefined);
      const normalizedSlug = normalizeSlug(record.slug);
      const nextRecord: ContentRecord = {
        ...record,
        id: `${record.type.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        slug: normalizedSlug,
        publishedAt,
        updatedAt: timestamp,
      };

      setStore((prev) => {
        const next = syncSitemapCounts({
          ...prev,
          content: [nextRecord, ...prev.content],
          seo: [createSeoRecordFromContent(nextRecord, prev.siteSettings.canonicalBaseUrl, timestamp), ...prev.seo],
        });

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Create",
          module: nextRecord.type,
          description: `Created "${nextRecord.title}" and generated a matching SEO record.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success(`${record.type} created.`);
      return nextRecord.id;
    },
    [sessionUser?.name],
  );

  const deleteContentRecord = useCallback(
    (id: string) => {
      setStore((prev) => {
        const target = prev.content.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = syncSitemapCounts({
          ...prev,
          content: prev.content.filter((item) => item.id !== id),
          seo: prev.seo.filter((item) => item.entityId !== id),
        });

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Delete",
          module: target.type,
          description: `Deleted "${target.title}" and removed its linked SEO record.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success("Content deleted.");
    },
    [sessionUser?.name],
  );

  const updateContentRecord = useCallback(
    (
      id: string,
      updates: Partial<ContentRecord>,
      options?: { silent?: boolean; action?: string; activityDescription?: string },
    ) => {
      setStore((prev) => {
        const target = prev.content.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const normalizedSlug = updates.slug ? normalizeSlug(updates.slug) : undefined;
        const nextCanonicalUrl = normalizedSlug
          ? buildCanonicalUrl(prev.siteSettings.canonicalBaseUrl, normalizedSlug)
          : undefined;

        const next = {
          ...prev,
          content: prev.content.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updates,
                  slug: normalizedSlug ?? item.slug,
                  updatedAt: formatAdminTimestamp(),
                }
              : item,
          ),
          seo: prev.seo.map((item) =>
            item.entityId === id
              ? {
                  ...item,
                  slug: normalizedSlug ?? item.slug,
                  canonicalUrl: nextCanonicalUrl ?? item.canonicalUrl,
                  focusKeyword: updates.focusKeyword ?? item.focusKeyword,
                  lastUpdated: formatAdminTimestamp(),
                }
              : item,
          ),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: options?.action ?? "Update",
          module: target.type,
          description: options?.activityDescription ?? `Saved editable fields for "${target.title}".`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      if (!options?.silent) {
        toast.success("Content changes saved.");
      }
    },
    [sessionUser?.name],
  );

  const updateContentStatus = useCallback(
    (id: string, status: WorkflowStatus) => {
      setStore((prev) => {
        const target = prev.content.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = {
          ...prev,
          content: prev.content.map((item) => (item.id === id ? { ...item, status } : item)),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Update",
          module: target.type,
          description: `Changed "${target.title}" to ${status}.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success("Status updated.");
    },
    [sessionUser?.name],
  );

  const updateSeoRecord = useCallback(
    (
      id: string,
      updates: Partial<SeoRecord>,
      options?: { silent?: boolean; action?: string; activityDescription?: string },
    ) => {
      setStore((prev) => {
        const target = prev.seo.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = {
          ...prev,
          seo: prev.seo.map((item) =>
            item.id === id ? { ...item, ...updates, lastUpdated: formatAdminTimestamp() } : item,
          ),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: options?.action ?? "Update",
          module: "SEO",
          description:
            options?.activityDescription ??
            `Saved SEO settings for ${target.entityType.toLowerCase()} "${target.slug}".`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      if (!options?.silent) {
        toast.success("SEO settings saved.");
      }
    },
    [sessionUser?.name],
  );

  const bulkUpdateSeoRecords = useCallback(
    (ids: string[], updates: Partial<SeoRecord>) => {
      if (!ids.length) {
        toast.error("Select at least one SEO record first.");
        return;
      }

      setStore((prev) => {
        const next = {
          ...prev,
          seo: prev.seo.map((item) =>
            ids.includes(item.id)
              ? {
                  ...item,
                  ...updates,
                  lastUpdated: formatAdminTimestamp(),
                }
              : item,
          ),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Bulk update",
          module: "SEO",
          description: `Applied bulk SEO changes to ${ids.length} record${ids.length > 1 ? "s" : ""}.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success(`Bulk SEO update applied to ${ids.length} record${ids.length > 1 ? "s" : ""}.`);
    },
    [sessionUser?.name],
  );

  const bulkFillFeaturedAltText = useCallback(() => {
    let updatedCount = 0;

    setStore((prev) => {
      const nextContent = prev.content.map((item) => {
        if (item.featuredImage && !item.featuredImageAlt?.trim()) {
          updatedCount += 1;
          return {
            ...item,
            featuredImageAlt: `${item.title} featured image`,
            updatedAt: formatAdminTimestamp(),
          };
        }

        return item;
      });

      const next = {
        ...prev,
        content: nextContent,
      };

      return updatedCount
        ? appendActivity(next, {
            user: sessionUser?.name ?? "System",
            action: "Bulk update",
            module: "Media SEO",
            description: `Generated fallback alt text for ${updatedCount} featured image${updatedCount > 1 ? "s" : ""}.`,
            ipAddress: "127.0.0.1",
            userAgent: "Current browser session",
          })
        : prev;
    });

    if (updatedCount) {
      toast.success(`Filled missing featured image alt text for ${updatedCount} record${updatedCount > 1 ? "s" : ""}.`);
      return;
    }

    toast.success("All featured image alt text is already filled.");
  }, [sessionUser?.name]);

  const importSeoRows = useCallback(
    (rows: Array<Partial<SeoRecord> & { slug: string }>) => {
      if (!rows.length) {
        toast.error("No CSV rows were provided.");
        return;
      }

      let matchedCount = 0;

      setStore((prev) => {
        const bySlug = new Map(rows.map((row) => [row.slug, row]));
        const nextSeo = prev.seo.map((item) => {
          const row = bySlug.get(item.slug);
          if (!row) {
            return item;
          }

          matchedCount += 1;
          return {
            ...item,
            ...row,
            lastUpdated: formatAdminTimestamp(),
          };
        });

        if (!matchedCount) {
          return prev;
        }

        return appendActivity(
          {
            ...prev,
            seo: nextSeo,
          },
          {
            user: sessionUser?.name ?? "System",
            action: "Import",
            module: "SEO",
            description: `Imported SEO CSV updates for ${matchedCount} record${matchedCount > 1 ? "s" : ""}.`,
            ipAddress: "127.0.0.1",
            userAgent: "Current browser session",
          },
        );
      });

      if (matchedCount) {
        toast.success(`Imported SEO updates for ${matchedCount} record${matchedCount > 1 ? "s" : ""}.`);
        return;
      }

      toast.error("No matching slugs were found in the current SEO records.");
    },
    [sessionUser?.name],
  );

  const addMediaAssets = useCallback(
    (files: File[]) => {
      if (!files.length) {
        return;
      }

      setStore((prev) => {
        const nextAssets: MediaAsset[] = files.map((file) => ({
          id: `media-${Date.now()}-${file.name}`,
          name: file.name,
          type: file.type.startsWith("image/")
            ? "Image"
            : file.type === "application/pdf"
              ? "PDF"
              : file.type.startsWith("video/")
                ? "Video"
                : "Document",
          mimeType: file.type || "application/octet-stream",
          sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
          dimensions: file.type.startsWith("image/") ? "Pending" : "n/a",
          altText: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
          title: file.name.replace(/\.[^.]+$/, ""),
          caption: "Recently uploaded asset",
          description: "Uploaded through the admin media library.",
          uploadedBy: sessionUser?.name ?? "Admin",
          uploadedAt: "2026-08-04 10:05",
          usage: "Unassigned",
          url: URL.createObjectURL(file),
        }));

        const next = { ...prev, media: [...nextAssets, ...prev.media] };
        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Upload",
          module: "Media Library",
          description: `Uploaded ${files.length} new asset${files.length > 1 ? "s" : ""}.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success(`${files.length} asset${files.length > 1 ? "s" : ""} added to media library.`);
    },
    [sessionUser?.name],
  );

  const updateMediaAsset = useCallback(
    (id: string, updates: Partial<MediaAsset>) => {
      setStore((prev) => {
        const target = prev.media.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = {
          ...prev,
          media: prev.media.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Update",
          module: "Media Library",
          description: `Updated metadata for "${target.name}".`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success("Media metadata saved.");
    },
    [sessionUser?.name],
  );

  const updateLeadStatus = useCallback(
    (id: string, status: LeadStatus) => {
      setStore((prev) => {
        const target = prev.leads.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = {
          ...prev,
          leads: prev.leads.map((item) => (item.id === id ? { ...item, status } : item)),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Update",
          module: target.kind,
          description: `Updated ${target.name}'s status to ${status}.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success("Lead status updated.");
    },
    [sessionUser?.name],
  );

  const updateLeadAssignee = useCallback(
    (id: string, assignee: string) => {
      setStore((prev) => {
        const target = prev.leads.find((item) => item.id === id);
        if (!target) {
          return prev;
        }

        const next = {
          ...prev,
          leads: prev.leads.map((item) => (item.id === id ? { ...item, assignedTo: assignee } : item)),
        };

        return appendActivity(next, {
          user: sessionUser?.name ?? "System",
          action: "Assign",
          module: target.kind,
          description: `Assigned ${target.name} to ${assignee}.`,
          ipAddress: "127.0.0.1",
          userAgent: "Current browser session",
        });
      });
      toast.success("Assignee updated.");
    },
    [sessionUser?.name],
  );

  const updateSubscriberStatus = useCallback(
    (id: string, status: SubscriberStatus) => {
      setStore((prev) => ({
        ...prev,
        newsletterSubscribers: prev.newsletterSubscribers.map((item) =>
          item.id === id ? { ...item, status } : item,
        ),
      }));
      toast.success("Subscriber updated.");
    },
    [],
  );

  const updateCampaignStatus = useCallback((id: string, status: EmailCampaign["status"]) => {
    setStore((prev) => ({
      ...prev,
      emailCampaigns: prev.emailCampaigns.map((item) => (item.id === id ? { ...item, status } : item)),
    }));
    toast.success("Campaign status saved.");
  }, []);

  const addRedirect = useCallback(
    (redirect: Omit<RedirectRecord, "id" | "createdAt" | "lastAccessed" | "hits">) => {
      setStore((prev) => {
        const nextRedirect: RedirectRecord = {
          id: `redirect-${Date.now()}`,
          createdAt: "2026-08-04",
          lastAccessed: "Never",
          hits: 0,
          ...redirect,
        };

        return {
          ...prev,
          redirects: [nextRedirect, ...prev.redirects],
        };
      });
      toast.success("Redirect created.");
    },
    [],
  );

  const addRedirectBatch = useCallback(
    (redirects: Array<Omit<RedirectRecord, "id" | "createdAt" | "lastAccessed" | "hits">>) => {
      if (!redirects.length) {
        toast.error("No redirects were provided.");
        return;
      }

      setStore((prev) => {
        const nextRedirects: RedirectRecord[] = redirects.map((redirect, index) => ({
          id: `redirect-${Date.now()}-${index}`,
          createdAt: formatAdminDate(),
          lastAccessed: "Never",
          hits: 0,
          ...redirect,
        }));

        return appendActivity(
          {
            ...prev,
            redirects: [...nextRedirects, ...prev.redirects],
          },
          {
            user: sessionUser?.name ?? "System",
            action: "Import",
            module: "Redirect Manager",
            description: `Imported ${redirects.length} redirect${redirects.length > 1 ? "s" : ""} in bulk.`,
            ipAddress: "127.0.0.1",
            userAgent: "Current browser session",
          },
        );
      });

      toast.success(`Imported ${redirects.length} redirect${redirects.length > 1 ? "s" : ""}.`);
    },
    [sessionUser?.name],
  );

  const toggleRedirect = useCallback((id: string) => {
    setStore((prev) => ({
      ...prev,
      redirects: prev.redirects.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    }));
  }, []);

  const updateIntegration = useCallback((id: string, updates: Partial<IntegrationSetting>) => {
    setStore((prev) => ({
      ...prev,
      integrations: prev.integrations.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    }));
    toast.success("Integration settings saved.");
  }, []);

  const updateSiteSettings = useCallback((updates: Partial<SiteSettings>) => {
    setStore((prev) => ({ ...prev, siteSettings: { ...prev.siteSettings, ...updates } }));
    toast.success("Site settings updated.");
  }, []);

  const saveRobotsTxt = useCallback((content: string) => {
    setStore((prev) => ({ ...prev, robotsTxt: content }));
    toast.success("robots.txt saved.");
  }, []);

  const restoreRobotsDefault = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      robotsTxt: initialStore.robotsTxt,
    }));
    toast.success("Default robots.txt restored.");
  }, []);

  const regenerateSitemap = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      sitemap: {
        ...prev.sitemap,
        lastGenerated: "2026-08-04 10:05",
        includedPages: prev.content.filter((item) => item.type === "Page").length,
        includedBlogs: prev.content.filter((item) => item.type === "Blog").length,
        includedResources: prev.content.filter((item) => item.type !== "Page" && item.type !== "Blog").length,
      },
    }));
    toast.success("Sitemap regenerated.");
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setStore((prev) => ({
      ...prev,
      notifications: prev.notifications.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      notifications: prev.notifications.map((item) => ({ ...item, unread: false })),
    }));
  }, []);

  const updateUserStatus = useCallback((id: string, status: UserRecord["status"]) => {
    setStore((prev) => ({
      ...prev,
      users: prev.users.map((item) => (item.id === id ? { ...item, status } : item)),
    }));
    toast.success("User status updated.");
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      store,
      sessionUser,
      theme,
      counts,
      login,
      logout,
      toggleTheme,
      createContentRecord,
      deleteContentRecord,
      updateContentRecord,
      updateContentStatus,
      updateSeoRecord,
      bulkUpdateSeoRecords,
      importSeoRows,
      bulkFillFeaturedAltText,
      addMediaAssets,
      updateMediaAsset,
      updateLeadStatus,
      updateLeadAssignee,
      updateSubscriberStatus,
      updateCampaignStatus,
      addRedirect,
      addRedirectBatch,
      toggleRedirect,
      updateIntegration,
      updateSiteSettings,
      saveRobotsTxt,
      restoreRobotsDefault,
      regenerateSitemap,
      markNotificationRead,
      markAllNotificationsRead,
      updateUserStatus,
    }),
    [
      store,
      sessionUser,
      theme,
      counts,
      login,
      logout,
      toggleTheme,
      createContentRecord,
      deleteContentRecord,
      updateContentRecord,
      updateContentStatus,
      updateSeoRecord,
      bulkUpdateSeoRecords,
      importSeoRows,
      bulkFillFeaturedAltText,
      addMediaAssets,
      updateMediaAsset,
      updateLeadStatus,
      updateLeadAssignee,
      updateSubscriberStatus,
      updateCampaignStatus,
      addRedirect,
      addRedirectBatch,
      toggleRedirect,
      updateIntegration,
      updateSiteSettings,
      saveRobotsTxt,
      restoreRobotsDefault,
      regenerateSitemap,
      markNotificationRead,
      markAllNotificationsRead,
      updateUserStatus,
    ],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminStore() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminStore must be used within AdminProvider.");
  }

  return context;
}

export function useContentByType(type: ContentType) {
  const { store } = useAdminStore();
  return useMemo(() => store.content.filter((item) => item.type === type), [store.content, type]);
}

export function useAverageSeoScore() {
  const { store } = useAdminStore();

  return useMemo(() => {
    if (!store.seo.length) {
      return 0;
    }

    return Math.round(
      store.seo.reduce((total, item) => total + item.overallScore, 0) / store.seo.length,
    );
  }, [store.seo]);
}
