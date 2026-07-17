#!/usr/bin/env node
/**
 * Convertica MCP server — convert PDF, Office, EPUB, HEIC and images
 * from Claude, Cursor or any MCP client via the convertica.net API.
 *
 * Env:
 *   CONVERTICA_API_KEY   required — get one at https://convertica.net/users/api-keys/
 *   CONVERTICA_API_BASE  optional — defaults to https://convertica.net
 */
import fs from "node:fs";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { CATALOG } from "./catalog.js";

const API_BASE = (process.env.CONVERTICA_API_BASE || "https://convertica.net").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 180_000;

const byGuess = new Map();
for (const t of CATALOG) {
  byGuess.set(t.slug, t);
  byGuess.set(t.slug.split("/").pop(), t); // "pdf-organize/merge" reachable as "merge"
}

function apiKey() {
  const key = process.env.CONVERTICA_API_KEY;
  if (!key) {
    throw new Error(
      "CONVERTICA_API_KEY is not set. Create a key at https://convertica.net/users/api-keys/ " +
        "(requires an active subscription) and add it to this server's env."
    );
  }
  return key;
}

function toolSummary(t) {
  const files = t.noFile
    ? "no file input"
    : t.multiFile
      ? `${t.fileField} (multiple files)`
      : [t.fileField, ...(t.extraFileFields || []), ...((t.optionalExtraFileFields || []).map((f) => f + "?"))].join(", ");
  const params = t.params.map((p) => `${p.name}${p.required ? "" : "?"} (${p.type}): ${p.description}`);
  return { tool: t.slug, description: t.summary, files, params };
}

function filenameFromDisposition(header, fallback) {
  if (header) {
    const star = header.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
    if (star) return decodeURIComponent(star[1].trim().replace(/^"|"$/g, ""));
    const plain = header.match(/filename="?([^";]+)"?/i);
    if (plain) return plain[1].trim();
  }
  return fallback;
}

function uniquePath(dir, name) {
  let target = path.join(dir, name);
  const { name: stem, ext } = path.parse(name);
  for (let i = 1; fs.existsSync(target); i++) target = path.join(dir, `${stem}-${i}${ext}`);
  return target;
}

async function runConversion({ tool, files = [], options = {}, output_dir }) {
  const spec = byGuess.get(tool);
  if (!spec) {
    const known = CATALOG.map((t) => t.slug).join(", ");
    throw new Error(`Unknown tool "${tool}". Available: ${known}`);
  }

  for (const f of files) {
    if (!fs.existsSync(f)) throw new Error(`File not found: ${f}`);
  }

  const form = new FormData();
  if (!spec.noFile) {
    if (files.length === 0) throw new Error(`"${spec.slug}" requires at least one input file.`);
    const attach = (field, file) =>
      form.append(field, new Blob([fs.readFileSync(file)]), path.basename(file));
    if (spec.multiFile) {
      for (const f of files) attach(spec.fileField, f);
    } else {
      attach(spec.fileField, files[0]);
      const extras = [...(spec.extraFileFields || []), ...(spec.optionalExtraFileFields || [])];
      files.slice(1).forEach((f, i) => {
        if (!extras[i]) throw new Error(`"${spec.slug}" accepts at most ${1 + extras.length} file(s).`);
        attach(extras[i], f);
      });
      const requiredExtras = spec.extraFileFields || [];
      if (files.length - 1 < requiredExtras.length) {
        throw new Error(`"${spec.slug}" requires ${1 + requiredExtras.length} input files (${spec.fileField}, ${requiredExtras.join(", ")}).`);
      }
    }
  }
  for (const [k, v] of Object.entries(options)) {
    if (v !== undefined && v !== null) form.append(k, String(v));
  }

  const res = await fetch(`${API_BASE}${spec.path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}` },
    body: form,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body.error || body.detail || JSON.stringify(body);
    } catch {
      detail = (await res.text().catch(() => "")).slice(0, 500);
    }
    const hints = {
      401: "Check that CONVERTICA_API_KEY is valid and your subscription is active.",
      403: "Your plan may not include this operation.",
      429: "Monthly API quota exhausted or rate limit hit — see https://convertica.net/pricing/.",
    };
    throw new Error(`Convertica API ${res.status} on ${spec.path}: ${detail} ${hints[res.status] || ""}`.trim());
  }

  const dir = output_dir || (files[0] ? path.dirname(path.resolve(files[0])) : process.cwd());
  fs.mkdirSync(dir, { recursive: true });
  const fallback = `${(files[0] ? path.parse(files[0]).name : "converted")}-${spec.slug.split("/").pop()}`;
  const name = filenameFromDisposition(res.headers.get("content-disposition"), fallback);
  const target = uniquePath(dir, name);
  fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
  const size = fs.statSync(target).size;
  return { saved: target, bytes: size, tool: spec.slug };
}

const server = new McpServer({ name: "convertica", version: "0.1.0" });

server.registerTool(
  "list_converters",
  {
    title: "List Convertica converters",
    description:
      "List all available file conversion tools (PDF ⇄ Word/Excel/PowerPoint/JPG/HTML/Markdown/EPUB/PDF-A, " +
      "merge/split/compress/protect PDF, image convert/optimize/HEIC, and more) with their input fields and options. " +
      "Call this first to find the right `tool` value for convert_file.",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: JSON.stringify(CATALOG.map(toolSummary), null, 1) }],
  })
);

server.registerTool(
  "convert_file",
  {
    title: "Convert a file with Convertica",
    description:
      "Run one of convertica.net's conversion tools on local file(s) and save the result next to the input " +
      "(or into output_dir). Use list_converters to see tool slugs and per-tool options. " +
      "Examples: {tool: 'pdf-to-word', files: ['/docs/report.pdf']}; " +
      "{tool: 'pdf-organize/merge', files: ['/a.pdf', '/b.pdf']}; " +
      "{tool: 'url-to-pdf', options: {url: 'https://example.com'}}.",
    inputSchema: {
      tool: z.string().describe("Tool slug from list_converters, e.g. 'pdf-to-word' or 'pdf-organize/merge'"),
      files: z.array(z.string()).optional().describe("Absolute paths of input file(s). Order matters for multi-file tools."),
      options: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
        .describe("Tool-specific options as listed by list_converters (e.g. {angle: 90, pages: 'all'})"),
      output_dir: z.string().optional().describe("Directory to save the result (default: alongside the first input file)"),
    },
  },
  async (args) => {
    const result = await runConversion(args);
    return {
      content: [
        {
          type: "text",
          text: `Saved ${result.saved} (${(result.bytes / 1024).toFixed(1)} KB) — ${result.tool} via convertica.net`,
        },
      ],
    };
  }
);

await server.connect(new StdioServerTransport());
