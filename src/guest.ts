import { guests } from "./data";
import type { Guest } from "./types";

const guestParamName = "guest";

export function getCurrentGuest(locationSearch: string): Guest {
  const params = new URLSearchParams(locationSearch);
  const token = params.get(guestParamName)?.trim();

  if (!token) {
    return guests[0] ?? { token: "guest", name: "дорогой гость" };
  }

  return guests.find((guest) => guest.token === token) ?? {
    token,
    name: "дорогой гость"
  };
}

export function createGuestUrl(origin: string, pathname: string, token: string): string {
  const url = new URL(pathname, origin);
  url.searchParams.set(guestParamName, token);
  return url.toString();
}
