# Button Route Audit

| Element | Page Location | Button Text | Current Destination | Correct Destination | Status | Notes |
| ------- | ------------- | ----------- | ------------------- | ------------------- | ------ | ----- |
| Logo | Top navbar (desktop + mobile) | Altroz logo | `/` | `/` | Working | Switched to router links. |
| Request Demo | Main navbar | Request Demo | `/company/book-demo` | `/company/book-demo` | Fixed | Was pointing to partner/contact flow earlier. |
| Start Free Trial | Main navbar | Start Free Trial | `/company/contact-us` | `/company/contact-us` | Fixed | Updated to the requested contact route. |
| Book Free Demo | Hero | Book Free Demo | `/company/book-demo` | `/company/book-demo` | Fixed | Uses router navigation. |
| Explore Features | Hero | Explore Features | `/#features` | `/#features` | Fixed | Smooth-scrolls to the homepage features section. |
| Learn More | Home product card | Learn more | `/products/core-hr` | `/products/core-hr` | Working | HRMS product card now matches the label. |
| Learn More | Home product card | Learn more | `/hr-analytics` | `/hr-analytics` | Working | Replaced the unrelated email campaign card with HR insights. |
| Learn More | Home feature grid | Asset Management | `/products/asset-management#asset-management` | `/products/asset-management#asset-management` | Fixed | Canonical product route updated. |
| Learn More | Home feature grid | HR Analytics | `/hr-analytics` | `/hr-analytics` | Fixed | Added a real destination instead of an empty card. |
| Learn More | Home feature grid | Security | `/hrms-security` | `/hrms-security` | Fixed | Added a real destination instead of an empty card. |
| Learn More | Integrations overview | Biometric Integration | `/products/attendance-management#attendance-features` | `/products/attendance-management#attendance-features` | Fixed | Dedicated integrations overview now lands on attendance features. |
| Learn More | Integrations overview | Accounting Integration | `/integrations/accounting` | `/integrations/accounting` | Fixed | Opens the accounting integration page. |
| Learn More | Integrations overview | Payroll Integration | `/products/payroll` | `/products/payroll` | Fixed | Opens the payroll product page. |
| Learn More | Footer | Learn | `/resources/learn` | `/resources/learn` | Fixed | Canonical learning route is now centralized. |
| Social icon | Footer | LinkedIn | `https://www.linkedin.com/company/REPLACE-WITH-CLIENT-PROFILE/` | Public company profile URL | Needs Client URL | Replaced the admin dashboard URL with a clear placeholder. |
| Social icon | Footer | Facebook | Public profile URL | Public profile URL | Working | Opens in a new tab. |
| Social icon | Footer | Instagram | Public profile URL | Public profile URL | Working | Opens in a new tab. |
| Social icon | Footer | YouTube | Public channel URL | Public channel URL | Working | Opens in a new tab. |
| WhatsApp floating button | Global | WhatsApp | `https://wa.me/2187825869?text=...` | `wa.me` link with client number | Working | Uses a prefilled message and safe external link attrs. |
| Newsletter subscribe | Footer | Subscribe | Frontend only | Backend or form service | Needs Backend | Still uses a preventDefault placeholder submission. |

