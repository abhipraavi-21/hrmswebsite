import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import env from "./config/env.js";
import apiRouter from "./routes/index.js";
import { authLimiter, generalLimiter } from "./middleware/rateLimiters.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { sanitizeRequest } from "./middleware/sanitizeRequest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = buildAllowedOrigins([
  env.FRONTEND_URL,
  env.ADMIN_URL,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:8081",
  "http://127.0.0.1:8081",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
]);

function buildAllowedOrigins(origins) {
  const expandedOrigins = new Set();

  for (const origin of origins) {
    if (!origin) {
      continue;
    }

    expandedOrigins.add(origin);

    try {
      const url = new URL(origin);

      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        url.hostname = url.hostname === "localhost" ? "127.0.0.1" : "localhost";
        expandedOrigins.add(url.origin);
      }
    } catch {
      // Ignore invalid URLs and keep the configured origin list unchanged.
    }
  }

  return [...expandedOrigins];
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(sanitizeRequest);
app.use(generalLimiter);

app.use(
  "/uploads",
  (_request, response, next) => {
    response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads")),
);
app.use("/api/admin/auth", authLimiter);
app.use("/api/public/customer-auth", authLimiter);
app.use("/api", apiRouter);

app.get("/health", (_request, response) => {
  response.json({ success: true, message: "OK", data: { status: "healthy" } });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
