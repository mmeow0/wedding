import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { guests } from "../src/data";
import type { Guest, RsvpPayload } from "../src/types";

export type StoredRsvpResponse = RsvpPayload & {
  readonly id?: string;
  readonly guestId?: string;
  readonly submittedAt: string;
  readonly userAgent: string;
};

type SupabaseGuestRow = {
  readonly id: string;
  readonly token: string;
  readonly name: string;
  readonly photo_path: string | null;
  readonly photo_url: string | null;
};

const responsesPath = resolve(process.cwd(), "data", "rsvp-responses.json");
const defaultPhotoBucket = "guest-photos";

export async function getGuestByToken(token: string): Promise<Guest> {
  const normalizedToken = token.trim();

  if (!normalizedToken) {
    return fallbackGuest("");
  }

  if (isSupabaseConfigured()) {
    const rows = await supabaseRequest<SupabaseGuestRow[]>(
      `/rest/v1/wedding_guests?token=eq.${encodeURIComponent(normalizedToken)}&select=id,token,name,photo_path,photo_url&limit=1`
    );
    const row = rows[0];

    if (row) {
      return {
        token: row.token,
        name: row.name,
        photoUrl: row.photo_url ?? publicStorageUrl(row.photo_path),
        isKnown: true
      };
    }
  }

  return guests.find((guest) => guest.token === normalizedToken) ?? fallbackGuest(normalizedToken);
}

export async function saveRsvpResponse(input: unknown, userAgent = ""): Promise<StoredRsvpResponse> {
  const parsed = parseRsvpResponse(input, userAgent);

  if (isSupabaseConfigured()) {
    const guestRows = await supabaseRequest<Array<{ readonly id: string; readonly name: string }>>(
      `/rest/v1/wedding_guests?token=eq.${encodeURIComponent(parsed.token)}&select=id,name&limit=1`
    );
    const guest = guestRows[0];

    const savedRows = await supabaseRequest<
      Array<{
        readonly id: string;
        readonly guest_id: string | null;
        readonly submitted_at: string;
      }>
    >("/rest/v1/wedding_rsvps", {
      method: "POST",
      headers: {
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        guest_id: guest?.id ?? null,
        guest_token: parsed.token,
        guest_name: guest?.name ?? parsed.guestName,
        attendance: parsed.attendance,
        drinks: parsed.drinks,
        allergens: parsed.allergens,
        menu_notes: parsed.menuNotes,
        song: parsed.song,
        message: parsed.message,
        user_agent: parsed.userAgent
      })
    });
    const saved = savedRows[0];

    return {
      ...parsed,
      id: saved?.id,
      guestId: saved?.guest_id ?? undefined,
      submittedAt: saved?.submitted_at ?? parsed.submittedAt
    };
  }

  if (isVercelRuntime()) {
    throw new Error("Supabase is not configured for production RSVP storage.");
  }

  await saveLocalRsvp(parsed);
  return parsed;
}

function parseRsvpResponse(input: unknown, userAgent: string): StoredRsvpResponse {
  if (!isRecord(input)) {
    throw new Error("Некорректный ответ формы.");
  }

  const token = requiredString(input.token, "token");
  const guestName = requiredString(input.guestName, "guestName");

  return {
    token,
    guestName,
    attendance: enumValue(input.attendance, ["yes", "no", "unsure"], "attendance"),
    plusOne: "no",
    plusOneName: "",
    drinks: arrayOfStrings(input.drinks),
    allergens: optionalString(input.allergens),
    menuNotes: optionalString(input.menuNotes),
    song: optionalString(input.song),
    message: optionalString(input.message),
    submittedAt: new Date().toISOString(),
    userAgent
  };
}

async function saveLocalRsvp(response: StoredRsvpResponse): Promise<void> {
  const existing = await readLocalResponses();
  const next = [...existing, response];

  await mkdir(dirname(responsesPath), { recursive: true });
  await writeFile(responsesPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}

async function readLocalResponses(): Promise<StoredRsvpResponse[]> {
  try {
    const content = await readFile(responsesPath, "utf8");
    const parsed: unknown = JSON.parse(content);
    return Array.isArray(parsed) ? parsed.filter(isStoredRsvpResponse) : [];
  } catch {
    return [];
  }
}

async function supabaseRequest<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase env vars are not configured.");
  }

  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase request failed: ${message}`);
  }

  return (await response.json()) as TResponse;
}

function publicStorageUrl(photoPath: string | null): string | undefined {
  if (!photoPath || !process.env.SUPABASE_URL) {
    return undefined;
  }

  const bucket = process.env.SUPABASE_INVITE_PHOTOS_BUCKET ?? defaultPhotoBucket;
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${photoPath}`;
}

function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL);
}

function fallbackGuest(token: string): Guest {
  return {
    token: token || "guest",
    name: "дорогой гость",
    isKnown: false
  };
}

function isStoredRsvpResponse(value: unknown): value is StoredRsvpResponse {
  return isRecord(value) && typeof value.token === "string" && typeof value.guestName === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Поле ${field} обязательно.`);
  }

  return value.trim().slice(0, 180);
}

function optionalString(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

function arrayOfStrings(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function enumValue<const TValue extends string>(
  value: unknown,
  allowed: readonly TValue[],
  field: string
): TValue {
  if (typeof value !== "string" || !allowed.includes(value as TValue)) {
    throw new Error(`Некорректное значение ${field}.`);
  }

  return value as TValue;
}
