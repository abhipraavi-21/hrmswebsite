import { fileURLToPath } from "node:url";

// Keep backend .env loading and upload paths identical to `cd backend && npm start`.
process.chdir(fileURLToPath(new URL("./backend/", import.meta.url)));
await import("./backend/server.js");
