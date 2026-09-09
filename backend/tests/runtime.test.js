import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, test } from "node:test";

const directory = mkdtempSync(path.join(tmpdir(), "hrms-runtime-test-"));
after(() => rmSync(directory, { recursive: true, force: true }));

function readPort(overrides) {
  const env = {
    ...process.env,
    DB_HOST: "localhost",
    DB_NAME: "test_only",
    DB_USER: "test_only",
    DB_PASSWORD: "",
    JWT_SECRET: "test-only-secret-for-config-validation",
    ADMIN_EMAIL: "test@example.com",
    ADMIN_PASSWORD: "test-only-password",
    ...overrides,
  };
  if (!Object.hasOwn(overrides, "PORT")) delete env.PORT;
  const envUrl = new URL("../src/config/env.js", import.meta.url).href;
  return spawnSync(process.execPath, [
    "--input-type=module",
    "--eval",
    `import env from ${JSON.stringify(envUrl)}; console.log(env.PORT);`,
  ], { cwd: directory, env, encoding: "utf8" });
}

test("production listens on Hostinger's port by default", () => {
  const result = readPort({ NODE_ENV: "production" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "3000");
});

test("local development retains its existing port", () => {
  const result = readPort({ NODE_ENV: "development" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "5000");
});

test("an explicit runtime port takes precedence", () => {
  const result = readPort({ NODE_ENV: "production", PORT: "5099" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "5099");
});

test("the hosting entry point can be loaded by a CommonJS launcher", () => {
  const fixture = path.join(directory, "launcher");
  mkdirSync(path.join(fixture, "backend"), { recursive: true });
  writeFileSync(path.join(fixture, "package.json"), JSON.stringify({ type: "module" }));
  copyFileSync(new URL("../../server.js", import.meta.url), path.join(fixture, "server.js"));
  writeFileSync(path.join(fixture, "backend/server.js"), "console.log('Backend loaded');");
  const result = spawnSync(process.execPath, ["--eval", "require('./server.js')"], {
    cwd: fixture,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Backend loaded/);
});
