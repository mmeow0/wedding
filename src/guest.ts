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

export async function fetchGuest(token: string): Promise<Guest> {
  if (!token) {
    return fallbackGuest;
  }

  try {
    const response = await fetch(`/api/guest?token=${encodeURIComponent(token)}`);

    if (!response.ok) {
      return getCurrentGuest(`?${guestParamName}=${encodeURIComponent(token)}`);
    }

    const payload = (await response.json()) as { guest?: Guest };
    return payload.guest ?? getCurrentGuest(`?${guestParamName}=${encodeURIComponent(token)}`);
  } catch {
    return getCurrentGuest(`?${guestParamName}=${encodeURIComponent(token)}`);
  }
}

export function createGuestUrl(origin: string, pathname: string, token: string): string {
  const url = new URL(pathname, origin);
  url.searchParams.set(guestParamName, token);
  return url.toString();
}
