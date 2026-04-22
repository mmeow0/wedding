import { weddingDetails } from "./data";
import { getCurrentGuest } from "./guest";
import { renderInvitation, renderSuccessMessage } from "./render";
import type { RsvpPayload } from "./types";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app was not found.");
}

const guest = getCurrentGuest(window.location.search);

app.innerHTML = renderInvitation({
  details: weddingDetails,
  guest,
  origin: window.location.origin,
  pathname: window.location.pathname
});

startCountdown(weddingDetails.dateIso);
bindRsvpForm();

function startCountdown(dateIso: string): void {
  const target = new Date(dateIso).getTime();
  const days = document.querySelector<HTMLElement>('[data-countdown="days"]');
  const hours = document.querySelector<HTMLElement>('[data-countdown="hours"]');
  const minutes = document.querySelector<HTMLElement>('[data-countdown="minutes"]');
  const seconds = document.querySelector<HTMLElement>('[data-countdown="seconds"]');

  const render = (): void => {
    const remaining = Math.max(target - Date.now(), 0);
    const totalSeconds = Math.floor(remaining / 1000);

    if (days) {
      days.textContent = String(Math.floor(totalSeconds / 86400));
    }

    if (hours) {
      hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600));
    }

    if (minutes) {
      minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60));
    }

    if (seconds) {
      seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
    }
  };

  render();
  window.setInterval(render, 1000);
}

function bindRsvpForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-rsvp-form]");
  const status = document.querySelector<HTMLElement>("[data-form-status]");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    statusMessage(status, "Отправляем...");

    try {
      const payload = createPayload(new FormData(form));
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Ответ не сохранился.");
      }

      statusMessage(status, renderSuccessMessage());
      form.dataset.sent = "true";
    } catch {
      statusMessage(status, "Не получилось отправить. Попробуйте ещё раз или напишите нам напрямую.");
    }
  });
}

function createPayload(formData: FormData): RsvpPayload {
  return {
    token: String(formData.get("token") ?? ""),
    guestName: String(formData.get("guestName") ?? ""),
    attendance: radioValue(formData, "attendance", ["yes", "no", "unsure"]),
    plusOne: "no",
    plusOneName: "",
    drinks: formData.getAll("drinks").map(String),
    allergens: String(formData.get("allergens") ?? ""),
    menuNotes: String(formData.get("menuNotes") ?? ""),
    song: String(formData.get("song") ?? ""),
    message: String(formData.get("message") ?? "")
  };
}

function radioValue<const TValue extends string>(
  formData: FormData,
  field: string,
  allowed: readonly TValue[]
): TValue {
  const value = String(formData.get(field) ?? "");

  if (!allowed.includes(value as TValue)) {
    return allowed[0] as TValue;
  }

  return value as TValue;
}

function statusMessage(status: HTMLElement | null, message: string): void {
  if (status) {
    status.textContent = message;
  }
}
