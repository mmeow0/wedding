import { defineConfig, type Connect } from "vite";
import type { ServerResponse } from "node:http";
import { getGuestByToken, saveRsvpResponse } from "./server/inviteStore";

export default defineConfig({
  server: {
    host: "127.0.0.1"
  },
  plugins: [
    {
      name: "wedding-api",
      configureServer(server) {
        server.middlewares.use("/api/guest", async (request, response) => {
          if (request.method !== "GET") {
            sendJson(response, 405, { error: "Method not allowed" });
            return;
          }

          try {
            const url = new URL(request.url ?? "", "http://localhost");
            const guest = await getGuestByToken(url.searchParams.get("token") ?? "");

            sendJson(response, 200, { guest });
          } catch (error) {
            sendJson(response, 400, {
              error: error instanceof Error ? error.message : "Could not load guest"
            });
          }
        });

        server.middlewares.use("/api/rsvp", async (request, response) => {
          if (request.method !== "POST") {
            sendJson(response, 405, { error: "Method not allowed" });
            return;
          }

          try {
            const body = await readJsonBody(request);
            const saved = await saveRsvpResponse(body);

            sendJson(response, 200, { ok: true, savedAt: saved.submittedAt });
          } catch (error) {
            sendJson(response, 400, {
              error: error instanceof Error ? error.message : "Could not save response"
            });
          }
        });
      }
    }
  ]
});

async function readJsonBody(request: Connect.IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(response: ServerResponse, statusCode: number, body: unknown): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}
