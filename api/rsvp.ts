import { saveRsvpResponse } from "../server/inviteStore";

type ApiRequest = {
  readonly method?: string;
  readonly body: unknown;
  readonly headers: {
    readonly ["user-agent"]?: string;
  };
};

type ApiResponse = {
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const saved = await saveRsvpResponse(request.body, request.headers["user-agent"] ?? "");
    response.status(200).json({ ok: true, savedAt: saved.submittedAt });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : "Could not save response"
    });
  }
}
