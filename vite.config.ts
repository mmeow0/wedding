import { defineConfig, type Connect } from "vite";
import { saveRsvpResponse } from "./server/rsvpStore";

export default defineConfig({
  server: {
    host: "127.0.0.1"
  },
  plugins: [
    {
      name: "wedding-rsvp-api",
      configureServer(server) {
        server.middlewares.use("/api/rsvp", async (request, response) => {
          if (request.method !== "POST") {
            response.statusCode = 405;
            response.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          try {
            const body = await readJsonBody(request);
            const saved = await saveRsvpResponse(body);

            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify({ ok: true, savedAt: saved.submittedAt }));
          } catch (error) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(
              JSON.stringify({
                error: error instanceof Error ? error.message : "Could not save response"
              })
            );
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
