import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";
import env from "./src/config/env.js";

async function startServer() {
  await connectDatabase();

  app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`Backend listening on port ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
