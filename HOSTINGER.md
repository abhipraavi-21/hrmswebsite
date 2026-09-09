# Deploy the website, admin and API on one Hostinger domain

This repository runs as one Express/Node.js application in production:

| URL | Application |
| --- | --- |
| `https://altroztech.com/` | Public React website |
| `https://altroztech.com/admin/` | React admin panel |
| `https://altroztech.com/api/` | Express API |
| `https://altroztech.com/health` | Server health check |
| `https://altroztech.com/uploads/` | Uploaded media |

The root `server.js` starts the backend, which serves both compiled React apps.
Production API requests use `/api`. The admin build uses `/admin/` as its base path.
Development still uses separate Vite and API servers.

## 1. Use Hostinger Node.js hosting

The existing plain Git deployment copies source into `public_html`; that cannot
compile React or run Express. Use **Websites → Add Website → Node.js Web App /
Deploy Web App → Import Git Repository** on a plan that supports Node.js
(Hostinger documents Business and Cloud plans).

If an existing Node.js app only needs GitHub reconnected, use its Dashboard
**⋮ → Connect to GitHub** or **Change repository**. Authorize access to the private
repository `altroztech-code/Website`, and select branch `main`.

For an existing ordinary website, create and test the Node.js app using a temporary
domain, then connect `altroztech.com`. If Hostinger requires releasing the domain
from the old website, download file/database/email backups and follow Hostinger's
domain migration instructions or ask support to move it. Removing a website can
delete its associated data. Do not replace Hostinger's generated Node.js routing
`.htaccess` with a static React rewrite file.

## 2. Create the production MySQL database

In hPanel open **Databases → Management**, create a database and database user,
and record the complete names (including any `u123456_` prefix), host and password.
Use the host shown in hPanel; it is usually `localhost`, port `3306`.

Use a new empty database for the first-install command below. Git does not transfer
your local MySQL records or uploaded media. To preserve local CMS edits, users or
business records, import a database export instead and migrate that database
without running the initial seed step.

## 3. Enter these build settings

| Setting | Value |
| --- | --- |
| Repository | `altroztech-code/Website` |
| Branch | `main` |
| Framework | **Express** (server-side Node.js) |
| Node.js version | **22.x** |
| Application root | Repository root: `.` (or leave empty if the UI uses empty for root) |
| Build command — new empty database, first deployment | `npm run build:hostinger:setup` |
| Build command — subsequent deployments | `npm run build:hostinger` |
| Output directory | `.` (keep the whole application, including `backend`, `shared`, `dist`, and `admin/dist`) |
| Entry file | `server.js` at the repository root |
| Start command, if offered | `npm start` |

Select the Express/server-side runtime even if automatic detection suggests Vite.
Publishing only `dist` would omit the running API and admin application.

The build command installs locked dependencies for all three packages and builds
both React apps. The first-install command additionally runs migrations and the
initial admin/CMS seeds. After its first success, change the build command to
`npm run build:hostinger` so later deployments do not rerun the initial seeds.
For future schema changes, use `npm run build:hostinger && npm --prefix backend run migrate`
for that release. Never use `db:reset` against production.

## 4. Add environment variables in hPanel

Add these through the Node.js deployment's **Environment variables** screen.
Replace every placeholder. Keep passwords and API secrets out of GitHub and do
not prefix them with `VITE_` (Vite variables are included in browser bundles).

```dotenv
NODE_ENV=production
PORT=3000
APP_URL=https://altroztech.com
FRONTEND_URL=https://altroztech.com
ADMIN_URL=https://altroztech.com/admin
TRUST_PROXY_HOPS=1

DB_HOST=YOUR_HOSTINGER_DATABASE_HOST
DB_PORT=3306
DB_NAME=YOUR_FULL_DATABASE_NAME
DB_USER=YOUR_FULL_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD

JWT_SECRET=YOUR_RANDOM_SECRET_AT_LEAST_32_CHARACTERS
JWT_EXPIRES_IN=1d
ADMIN_NAME=Super Admin
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=YOUR_UNIQUE_PASSWORD_AT_LEAST_12_CHARACTERS

VITE_API_BASE_URL=/api
VITE_ADMIN_APP_URL=/admin
VITE_PUBLIC_SITE_URL=https://altroztech.com
VITE_SITE_URL=https://altroztech.com
MAX_FILE_SIZE_MB=100
```

Set `PORT=3000` for Hostinger's Node.js runtime. The app also defaults to 3000 in
production when no port is supplied, and to 5000 in local development. An explicitly
configured `PORT` takes precedence.
`TRUST_PROXY_HOPS=1` assumes one reverse proxy in front of Express. If Hostinger
reports a different proxy configuration, adjust the hop count to match it.

The build-time environment must include the DB and admin variables when using
`build:hostinger:setup`. That command initializes the DB through the build system;
it does not depend on Node/npm being available over SSH.

For payment checkout, also configure the real `RAZORPAY_KEY_ID` and
`RAZORPAY_KEY_SECRET` in hPanel. Other pages can run without payment credentials.

For durable uploads, set `UPLOAD_DIR` to an absolute writable folder outside the
deployment directory, using a persistent location confirmed for your Hostinger
account. The default `src/uploads` is inside the backend and is suitable for local
development; do not rely on deployment files surviving redeployments. Both upload
storage and `/uploads` serving use the configured path.

## 5. Deploy, verify and enable automatic updates

Click Deploy and check the build/runtime logs. With a fresh database, the first
build should show successful migrations and seeders. Then visit:

- `/health`: JSON containing `"status":"healthy"`.
- `/api/public/hrms`: JSON containing CMS content.
- `/`: the public website.
- `/admin/login`: log in with the admin email/password configured for the initial seed.
- A nested page such as `/hrms`: refresh it to verify routing.

Change the build command to `npm run build:hostinger`, connect the final domain,
and enable auto-deployment from `main`. Future source changes can be published with
`git push altroztech main` from this checkout. Database data stays in MySQL.

## References

- [Hostinger Node.js setup, GitHub reconnection and domain migration](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Hostinger MySQL connection guide](https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/)
- [Hostinger deployment environment variables](https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/)
- [Hostinger runtime port and deployment troubleshooting](https://www.hostinger.com/support/fix-failed-to-build-application-error-hostinger-node-js/)
