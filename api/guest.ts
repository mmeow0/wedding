import { getGuestByToken } from "../server/inviteStore.js";

type ApiRequest = {
  readonly method?: string;
  readonly query: {
    readonly token?: string | string[];
  };
};

type ApiResponse = {
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const rawToken = request.query.token;
    const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
    const guest = await getGuestByToken(token ?? "");

    response.status(200).json({ guest });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : "Could not load guest"
    });
  }
}
