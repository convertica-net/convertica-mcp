// Smallest runnable check: speaks MCP over stdio to the real server binary.
// Without CONVERTICA_API_KEY it verifies the protocol surface (tools/list);
// with a key it also runs one real jpg-to-pdf conversion against the API.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert";

const proc = spawn("node", [new URL("../src/index.js", import.meta.url).pathname], {
  stdio: ["pipe", "pipe", "inherit"],
});
let buf = "";
const pending = new Map();
proc.stdout.on("data", (d) => {
  buf += d;
  let nl;
  while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl);
    buf = buf.slice(nl + 1);
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  }
});
let nextId = 1;
function rpc(method, params) {
  const id = nextId++;
  proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
  return new Promise((resolve, reject) => {
    pending.set(id, resolve);
    setTimeout(() => reject(new Error(`timeout on ${method}`)), 120_000).unref();
  });
}

const init = await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "smoke", version: "0" },
});
assert.equal(init.result.serverInfo.name, "convertica");
proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

const tools = await rpc("tools/list", {});
const names = tools.result.tools.map((t) => t.name).sort();
assert.deepEqual(names, ["convert_file", "list_converters"]);

const list = await rpc("tools/call", { name: "list_converters", arguments: {} });
const catalog = JSON.parse(list.result.content[0].text);
assert.ok(catalog.length >= 35, `expected ≥35 tools, got ${catalog.length}`);
assert.ok(catalog.some((t) => t.tool === "pdf-to-word"));
console.log(`protocol OK — ${catalog.length} converters listed`);

if (process.env.CONVERTICA_API_KEY) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "convertica-mcp-"));
  const jpg = path.join(dir, "pixel.jpg");
  // 1x1 white JPEG
  fs.writeFileSync(
    jpg,
    Buffer.from(
      "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q==",
      "base64"
    )
  );
  const conv = await rpc("tools/call", {
    name: "convert_file",
    arguments: { tool: "jpg-to-pdf", files: [jpg] },
  });
  const text = conv.result.content[0].text;
  assert.ok(!conv.result.isError, `conversion failed: ${text}`);
  const saved = text.match(/Saved (\S+)/)[1];
  assert.ok(fs.statSync(saved).size > 100, "output PDF suspiciously small");
  assert.ok(fs.readFileSync(saved).subarray(0, 4).toString() === "%PDF", "output is not a PDF");
  console.log(`live conversion OK — ${text}`);
  fs.rmSync(dir, { recursive: true, force: true });
} else {
  console.log("CONVERTICA_API_KEY not set — skipped live conversion");
}
proc.kill();
