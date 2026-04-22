import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { saveRsvpResponse } from "./rsvpStore";

const port = Number(process.env.PORT ?? 4173);
const publicDir = resolve(process.cwd(), "dist");

const server = createServer(async (request, response) => {
  if (!request.url) {
    response.writeHead(400).end("Bad request");
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

  if (url.pathname === "/api/rsvp") {
    if (request.method !== "POST") {
      response.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    try {
      const saved = await saveRsvpResponse(await readJsonBody(request), request);
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ ok: true, savedAt: saved.submittedAt }));
    } catch (error) {
      response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: error instanceof Error ? error.message : "Could not save response" }));
    }

    return;
  }

  const filePath = await resolveStaticPath(url.pathname);
  const contentType = mimeType(filePath);

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Wedding invitation server: http://127.0.0.1:${port}/`);
});

async function readJsonBody(request: NodeJS.ReadableStream): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function resolveStaticPath(pathname: string): Promise<string> {
  const requested = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(publicDir, requested === "/" ? "index.html" : requested);

  try {
    const info = await stat(candidate);
    return info.isDirectory() ? join(candidate, "index.html") : candidate;
  } catch {
    return join(publicDir, "index.html");
  }
}

function mimeType(filePath: string): string {
  switch (extname(filePath)) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    default:
      return "text/html; charset=utf-8";
  }
}
