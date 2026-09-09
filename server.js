import { fileURLToPath } from "node:url";

// Keep backend .env loading and upload paths identical to `cd backend && npm start`.
process.chdir(fileURLToPath(new URL("./backend/", import.meta.url)));
// Hosting launchers may load the entry file with require(); keep its module graph synchronous.
import("./backend/server.js").catch((error) => {
  console.error("Failed to load backend:", error);
  process.exit(1);
});
