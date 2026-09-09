import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import express from "express";
import { mountFrontend } from "../src/middleware/frontend.js";
import { cmsSeedPages } from "../../shared/cms/index.js";

const directory = mkdtempSync(path.join(tmpdir(), "hrms-frontend-test-"));
let server;
let origin;

before(async () => {
  const app = express();
  app.use(["/api", "/uploads"], (_request, response) => {
    response.status(404).json({ success: false });
  });
  for (const name of ["admin", "public"]) {
    const build = path.join(directory, name);
    mkdirSync(path.join(build, "assets"), { recursive: true });
    writeFileSync(path.join(build, "index.html"), `<html>${name}<script>window.example = true;</script></html>`);
    writeFileSync(path.join(build, "assets/app.js"), `console.log('${name}')`);
    mountFrontend(app, name === "admin" ? "/admin" : "/", build);
  }
  await new Promise((resolve) => { server = app.listen(0, "127.0.0.1", resolve); });
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  rmSync(directory, { recursive: true, force: true });
});

test("public and admin deep links serve their own SPA", async () => {
  for (const [route, marker] of [["/", "public"], ["/hrms/payroll", "public"], ["/admin/", "admin"], ["/admin/login", "admin"]]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.match(await response.text(), new RegExp(`<html>${marker}`));
  }
});

test("compiled assets are served at the correct public and admin paths", async () => {
  for (const route of ["/assets/app.js", "/admin/assets/app.js"]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /javascript/);
  }
});

test("missing API endpoints, uploads and assets do not receive SPA HTML", async () => {
  for (const route of ["/api/missing", "/api/admin/missing", "/uploads/missing.png", "/assets/missing.js", "/admin/assets/missing.js", "/.env"]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404, route);
    assert.doesNotMatch(await response.text(), /<html>/);
  }
});

test("frontend CSP permits the bundled analytics script through its hash", async () => {
  const response = await fetch(origin);
  const policy = response.headers.get("content-security-policy");
  assert.match(policy, /script-src[^;]*'sha256-/);
  assert.doesNotMatch(policy, /script-src[^;]*'unsafe-inline'/);
  assert.match(policy, /https:\/\/checkout.razorpay.com/);
});

test("a missing production build gives an actionable startup error", () => {
  assert.throws(() => mountFrontend(express(), "/", path.join(directory, "missing")), /build:hostinger/);
});

test("initial CMS pages satisfy the database's unique page keys and slugs", () => {
  for (const field of ["pageKey", "slug"]) {
    const values = cmsSeedPages.map((page) => page[field]);
    assert.equal(new Set(values).size, values.length, `Duplicate CMS ${field}`);
  }
  assert.equal(cmsSeedPages.find((page) => page.slug === "asset-management")?.pageKey, "asset-management-suite");
});
