import { guests } from "./data";
import type { Guest } from "./types";

const guestParamName = "guest";
const fallbackGuest: Guest = { token: "guest", name: "дорогой гость", isKnown: false };

export function getGuestToken(locationSearch: string): string {
  const params = new URLSearchParams(locationSearch);
  return params.get(guestParamName)?.trim() ?? "";
}

export function getCurrentGuest(locationSearch: string): Guest {
  const token = getGuestToken(locationSearch);

  if (!token) {
    return guests[0] ?? fallbackGuest;
  }

  return guests.find((guest) => guest.token === token) ?? {
    token,
    name: "дорогой гость",
    isKnown: false
  };
}

export async function fetchGuest(token: string, timeoutMs = 30000): Promise<Guest | null> {
  if (!token) {
    return null;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`/api/guest?token=${encodeURIComponent(token)}`, {
      signal: controller.signal
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { guest?: Guest };
    return payload.guest ?? null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function createGuestUrl(origin: string, pathname: string, token: string): string {
  const url = new URL(pathname, origin);
  url.searchParams.set(guestParamName, token);
  return url.toString();
}
