# Altroz HRMS CMS

This repository keeps the existing public HRMS website intact while adding:

- a MySQL-backed Express API in `backend/`
- a separate React admin panel in `admin/`
- CMS-driven content for the HRMS, pricing, contact, and resource pages

The public site still lives at the repository root. The admin app and backend are intentionally separated.

## Stack

- Public frontend: React, Vite, Tailwind, React Router, Axios
- Admin panel: React, Vite, Tailwind, React Router, React Hook Form, Axios, Zod
- Backend: Node.js, Express, Sequelize, MySQL, JWT, bcrypt, Multer, Zod

## Node.js

Use Node.js `20.19+` or Node.js `22 LTS`.

## Folder Structure

```text
.
|-- admin/
|-- backend/
|-- public/
|-- shared/
`-- src/
```

- `src/`: existing public website
- `shared/cms/`: seed content used by the backend
- `backend/src/`: API, models, services, routes, middleware, migrations, seeders
- `admin/src/`: CMS dashboard, auth flow, editors, media and enquiry screens

## Environment Files

Public site:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ADMIN_APP_URL=http://localhost:5174
```

Admin app:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend:

```env
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:8080
ADMIN_URL=http://localhost:5174

DB_HOST=localhost
DB_PORT=3306
DB_NAME=hrms1
DB_USER=root
DB_PASSWORD=root

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d

ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=ChangeThisPassword123!

UPLOAD_DIR=src/uploads
MAX_FILE_SIZE_MB=5
```

## MySQL Setup

1. Create a local MySQL database named `hrms1`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Confirm the database credentials match your local MySQL instance.

Example:

```sql
CREATE DATABASE hrms1;
```

## Installation

Public site:

```bash
npm install
```

Admin panel:

```bash
cd admin
npm install
```

Backend:

```bash
cd backend
npm install
```

## Database Commands

From `backend/`:

```bash
npm run migrate
npm run seed
```

Reset everything:

```bash
npm run db:reset
```

## Development

Start the backend:

```bash
cd backend
npm run dev
```

Start the admin:

```bash
cd admin
npm run dev
```

Start the public site:

```bash
npm run dev
```

Default local URLs:

- Public site: `http://localhost:8080`
- Admin panel: `http://localhost:5174`
- API: `http://localhost:5000`

## Production Builds

Public site:

```bash
npm run build
```

Admin panel:

```bash
cd admin
npm run build
```

Backend:

```bash
cd backend
npm run start
```

## Default Admin User

The admin account is created through the backend seeders using:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Run `npm run seed` in `backend/` after setting these values.

## Public API

- `GET /api/public/pages/:pageKey`
- `GET /api/public/hrms`
- `GET /api/public/resources`
- `GET /api/public/resources/:slug`
- `GET /api/public/pricing`
- `GET /api/public/contact`
- `POST /api/public/contact-enquiries`

## Admin API

Auth:

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/profile`
- `PUT /api/admin/auth/profile`
- `PUT /api/admin/auth/change-password`

CMS:

- `GET /api/admin/pages`
- `GET /api/admin/pages/:id`
- `PUT /api/admin/pages/:id`
- `POST /api/admin/pages/:pageId/sections`
- `PUT /api/admin/pages/sections/:sectionId`
- `DELETE /api/admin/pages/sections/:sectionId`
- `PATCH /api/admin/pages/sections/reorder`
- `POST /api/admin/pages/sections/:sectionId/items`
- `PUT /api/admin/pages/section-items/:id`
- `DELETE /api/admin/pages/section-items/:id`
- `PATCH /api/admin/pages/section-items/reorder`

Pricing:

- `GET /api/admin/pricing-plans`
- `POST /api/admin/pricing-plans`
- `PUT /api/admin/pricing-plans/:id`
- `DELETE /api/admin/pricing-plans/:id`
- `POST /api/admin/pricing-plans/:id/duplicate`
- `POST /api/admin/pricing-plans/:planId/features`
- `PUT /api/admin/pricing-plans/features/:id`
- `DELETE /api/admin/pricing-plans/features/:id`

Contact and enquiries:

- `GET /api/admin/contact/settings`
- `PUT /api/admin/contact/settings`
- `GET /api/admin/contact/enquiries`
- `GET /api/admin/contact/enquiries/:id`
- `PATCH /api/admin/contact/enquiries/:id/status`
- `PATCH /api/admin/contact/enquiries/:id/notes`
- `POST /api/admin/contact/enquiries/bulk-status`
- `GET /api/admin/contact/enquiries/export`
- `DELETE /api/admin/contact/enquiries/:id`

Media:

- `GET /api/admin/media`
- `POST /api/admin/media/upload`
- `PUT /api/admin/media/:id`
- `DELETE /api/admin/media/:id`

## Uploads

During development, uploads are stored in:

```text
backend/src/uploads/
```

They are served by the backend from:

```text
/uploads/<filename>
```

## Troubleshooting

- If the frontend or admin cannot reach the API, confirm `VITE_API_BASE_URL`.
- If Sequelize commands fail, confirm MySQL is running and `backend/.env` matches your local credentials.
- If login fails after reseeding, rerun `npm run seed` inside `backend/`.
- If uploads do not appear, confirm the backend is serving `/uploads` and the `src/uploads` directory exists.
