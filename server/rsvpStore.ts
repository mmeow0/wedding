import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { IncomingMessage } from "node:http";

export type RsvpResponse = {
  readonly token: string;
  readonly guestName: string;
  readonly attendance: "yes" | "no" | "unsure";
  readonly plusOne: "yes" | "no";
  readonly plusOneName: string;
  readonly drinks: readonly string[];
  readonly allergens: string;
  readonly menuNotes: string;
  readonly song: string;
  readonly message: string;
  readonly submittedAt: string;
  readonly userAgent: string;
};

const responsesPath = resolve(process.cwd(), "data", "rsvp-responses.json");

export async function saveRsvpResponse(input: unknown, request?: IncomingMessage): Promise<RsvpResponse> {
  const response = parseRsvpResponse(input, request?.headers["user-agent"] ?? "");
  const existing = await readResponses();
  const next = existing.filter((item) => item.token !== response.token);

  next.push(response);
  next.sort((a, b) => a.guestName.localeCompare(b.guestName, "ru"));

  await mkdir(dirname(responsesPath), { recursive: true });
  await writeFile(responsesPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");

  return response;
}

async function readResponses(): Promise<RsvpResponse[]> {
  try {
    const content = await readFile(responsesPath, "utf8");
    const parsed: unknown = JSON.parse(content);
    return Array.isArray(parsed) ? parsed.filter(isRsvpResponse) : [];
  } catch {
    return [];
  }
}

function parseRsvpResponse(input: unknown, userAgent: string): RsvpResponse {
  if (!isRecord(input)) {
    throw new Error("Некорректный ответ формы.");
  }

  const token = requiredString(input.token, "token");
  const guestName = requiredString(input.guestName, "guestName");
  const attendance = enumValue(input.attendance, ["yes", "no", "unsure"], "attendance");
  const plusOne = enumValue(input.plusOne, ["yes", "no"], "plusOne");

  return {
    token,
    guestName,
    attendance,
    plusOne,
    plusOneName: optionalString(input.plusOneName),
    drinks: arrayOfStrings(input.drinks),
    allergens: optionalString(input.allergens),
    menuNotes: optionalString(input.menuNotes),
    song: optionalString(input.song),
    message: optionalString(input.message),
    submittedAt: new Date().toISOString(),
    userAgent
  };
}

function isRsvpResponse(value: unknown): value is RsvpResponse {
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

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
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
