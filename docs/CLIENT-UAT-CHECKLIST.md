# Altroz HRMS Admin Panel Client UAT Checklist

Date: August 4, 2026

## Access Details

- Public website: `https://hrmswebsite-gamma.vercel.app`
- Admin login: `https://hrmswebsite-gamma.vercel.app/admin/login`
- Recommended demo accounts:
  - `sara@altrozhr.com` for Super Admin
  - `avni@altrozhr.com` for SEO Manager
  - `nisha@altrozhr.com` for Client Admin
- Demo password: `Altroz@123`

## Important Testing Note

- The frontend is hosted on Vercel and the backend is hosted on Render.
- If the backend has been idle, the first save or load can take up to 30 to 60 seconds.
- This delay is expected on the free testing environment.

## Test Result Format

- Mark each item as `Pass`, `Fail`, or `Needs review`.
- Add notes and screenshots for any failed item.

## 1. Login and Access

- Open the admin login page.
- Sign in with the provided test account.
- Confirm the dashboard opens successfully.
- Confirm the visible modules match the logged-in user role.
- Log out and sign in again.
- Expected result:
  The client can sign in successfully and the correct admin modules are visible.

## 2. Dashboard and Navigation

- Open Dashboard.
- Confirm navigation links open the correct admin sections.
- Confirm counts, cards, and summary blocks load without blank states or broken UI.
- Expected result:
  The dashboard loads correctly and navigation works across modules.

## 3. Pages Management

- Open `Pages`.
- Edit any existing page title, summary, CTA label, or content field.
- Save the change.
- Refresh the browser.
- Confirm the edited value still appears.
- Expected result:
  Page content edits save successfully and persist after refresh.

## 4. SEO Management

- Open `SEO Management`.
- Select the Home page or Pricing page SEO record.
- Edit and save:
  - SEO title
  - Meta title
  - Meta description
  - Canonical URL
  - Focus keyword
  - Robots
  - Open Graph title and description
- Refresh the page.
- Confirm the saved values remain.
- Expected result:
  SEO changes save and persist correctly.

## 5. Bulk SEO Tools

- In `SEO Management`, test:
  - Meta prefix
  - Meta suffix
  - Bulk schema type
  - Bulk robots
  - Bulk alt text
  - CSV export
- Expected result:
  Bulk actions apply correctly to the selected records and export works.

## 6. Blog Management

- Open `Blog Management`.
- Create a new blog.
- Fill in:
  - Title
  - Slug
  - Category
  - Author
  - Short description
  - Featured image
  - Featured image alt text
- Save the blog.
- Edit the same blog and save again.
- Delete the blog if deletion is part of the test.
- Expected result:
  Blogs can be created, edited, and deleted successfully.

## 7. Learn Resources

- Open `Learn Resources`.
- Create a new record.
- Edit and save the resource fields.
- Refresh the page.
- Confirm the record remains visible with the saved values.
- Expected result:
  Learn resources support add, edit, and persistence correctly.

## 8. Compliance Guides

- Open `Compliance Guides`.
- Create a new guide.
- Edit and save the guide.
- Delete the guide if deletion is part of the test.
- Expected result:
  Compliance guides support add, edit, and delete operations correctly.

## 9. FAQ Management

- Open `FAQ Management`.
- Add a new FAQ item.
- Edit the FAQ and save.
- Delete the FAQ if deletion is part of the test.
- Expected result:
  FAQ items can be created, updated, and removed correctly.

## 10. Media Library

- Open `Media Library`.
- Upload at least one file.
- Edit:
  - Alt text
  - Title
  - Caption
  - Description
- Save changes.
- Expected result:
  Media uploads and metadata editing work correctly.

## 11. Redirect Manager

- Open `Redirect Manager`.
- Add a redirect rule.
- Save it.
- Disable or enable the rule.
- Expected result:
  Redirect rules can be created and status can be changed successfully.

## 12. Sitemap and Robots

- Open `Sitemap Manager`.
- Regenerate sitemap if visible.
- Open `robots.txt` settings and save an update.
- Expected result:
  Technical SEO controls are accessible and save correctly.

## 13. Public Website Reflection

- Make one visible change in admin, for example:
  - Home page content
  - Blog content
  - SEO title
  - Meta description
- Save the change in admin.
- Refresh the related public page on `https://hrmswebsite-gamma.vercel.app`.
- Expected result:
  The public site reflects the saved admin updates.

## 14. Data Persistence

- Save changes in any module.
- Refresh the browser.
- Log out.
- Log in again.
- Confirm the previously saved values are still present.
- Expected result:
  Saved changes persist across refresh and login sessions.

## 15. Role-Based Access Check

- Log in as different roles if required:
  - Super Admin
  - SEO Manager
  - Client Admin
- Confirm that restricted modules are hidden for lower-permission roles.
- Expected result:
  Role-based access is working correctly.

## 16. Final Client Sign-Off

- Overall admin usability: `Pass / Fail`
- SEO management usability: `Pass / Fail`
- Content editing usability: `Pass / Fail`
- Public site update flow: `Pass / Fail`
- Save and persistence behavior: `Pass / Fail`
- Ready for next phase approval: `Yes / No`

## Issue Log Template

- Module:
- Action performed:
- Expected result:
- Actual result:
- Screenshot or recording:
- Priority: `High / Medium / Low`
