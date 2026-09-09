import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import express from "express";
import helmet from "helmet";

export function mountFrontend(app, mountPath, directory) {
  const indexPath = path.join(directory, "index.html");
  let html;
  try {
    html = readFileSync(indexPath, "utf8");
  } catch {
    throw new Error(`Missing frontend build at ${indexPath}. Run npm run build:hostinger first.`);
  }

  // Allow the existing inline analytics bootstrap without allowing arbitrary inline scripts.
  const inlineScriptHashes = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .filter((match) => match[1].trim())
    .map((match) => `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`);

  const router = express.Router();
  router.use(helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "https://www.googletagmanager.com", "https://checkout.razorpay.com", ...inlineScriptHashes],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'", "https:"],
        frameSrc: ["'self'", "https:"],
        mediaSrc: ["'self'", "blob:", "https:"],
      },
    },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  }));
  router.use(express.static(directory));
  router.get("*", (request, response, next) => {
    if (
      path.extname(request.path) ||
      request.path.split("/").some((part) => part.startsWith(".")) ||
      !request.accepts("html")
    ) {
      return next();
    }
    response.sendFile(indexPath);
  });
  // Prevent missing admin assets from falling through to the public app.
  router.use((_request, response) => response.status(404).send("Not found"));
  app.use(mountPath, router);
}
