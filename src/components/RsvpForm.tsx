import { useState } from "react";
import { attendanceOptions, drinkOptions } from "../content";
import type { Guest, RsvpPayload } from "../types";

type RsvpFormProps = {
  readonly guest: Guest;
};

type StatusState = {
  readonly tone: "pending" | "error";
  readonly message: string;
};

export function RsvpForm({ guest }: RsvpFormProps) {
  const [attendance, setAttendance] = useState<RsvpPayload["attendance"] | "">("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  const toggleDrink = (value: string): void => {
    setDrinks((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!attendance) {
      setStatus({
        tone: "error",
        message: "Пожалуйста, выберите, сможете ли вы прийти."
      });
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload: RsvpPayload = {
      token: guest.token,
      guestName: guest.name,
      attendance,
      plusOne: "no",
      plusOneName: "",
      drinks,
      drinkNotes: String(formData.get("drinkNotes") ?? ""),
      allergens: String(formData.get("allergens") ?? ""),
      menuNotes: String(formData.get("menuNotes") ?? ""),
      song: String(formData.get("song") ?? ""),
      avoidSongs: String(formData.get("avoidSongs") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    setIsSubmitting(true);
    setStatus({
      tone: "pending",
      message: "Отправляем ответ..."
    });

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Response could not be saved.");
      }

      setIsSubmitted(true);
      setStatus(null);
    } catch {
      setStatus({
        tone: "error",
        message: "Не получилось отправить. Попробуйте ещё раз или напишите нам напрямую."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="surface-card success-card">
        <div className="ornament" aria-hidden="true">
          <span className="ornament__flower">✿</span>
        </div>
        <h3 className="success-card__title">Спасибо!</h3>
        <p className="success-card__text">Ваш ответ сохранён, мы всё учтём.</p>
      </div>
    );
  }

  return (
    <form className="surface-card form-card" onSubmit={handleSubmit}>
      <div className="form-card__intro">
        <h3 className="form-card__title">Поделитесь, как вам будет комфортнее</h3>
      </div>

      <fieldset className="form-card__group">
        <legend>Вы сможете прийти? *</legend>
        <div className="option-grid">
          {attendanceOptions.map((option) => (
            <label
              key={option.value}
              className={attendance === option.value ? "option-card is-selected" : "option-card"}
            >
              <input
                type="radio"
                name="attendance"
                value={option.value}
                checked={attendance === option.value}
                onChange={() => {
                  setAttendance(option.value);
                  setStatus(null);
                }}
                disabled={isSubmitting}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="form-card__group">
        <legend>Что предпочтёте выпить?</legend>
        <div className="option-grid option-grid--two">
          {drinkOptions.map((option) => (
            <label
              key={option.value}
              className={drinks.includes(option.value) ? "option-card is-selected" : "option-card"}
            >
              <input
                type="checkbox"
                name="drinks"
                value={option.value}
                checked={drinks.includes(option.value)}
                onChange={() => {
                  toggleDrink(option.value);
                }}
                disabled={isSubmitting}
              />
              <span>{option.label}</span>
            </label>
          ))}
          <label className="option-card option-card--text">
            <input
              className="option-card__text-input"
              name="drinkNotes"
              type="text"
              placeholder="...или что бы вы предпочли"
              disabled={isSubmitting}
            />
          </label>
        </div>
      </fieldset>

      <div className="field-grid">
        <label className="field">
          <span className="field-label">Аллергии и ограничения в еде</span>
          <textarea
            className="text-area"
            name="allergens"
            rows={3}
            placeholder="Например: орехи, рыба, лактоза"
            disabled={isSubmitting}
          />
        </label>

        <label className="field">
          <span className="field-label">Что ещё учесть по меню?</span>
          <textarea
            className="text-area"
            name="menuNotes"
            rows={3}
            placeholder="Любые пожелания, которые помогут нам выбрать меню"
            disabled={isSubmitting}
          />
        </label>

        <label className="field">
          <span className="field-label">Песни, под которые вы точно выйдете танцевать</span>
          <input
            className="text-input"
            name="song"
            type="text"
            placeholder="Можно оставить пустым"
            disabled={isSubmitting}
          />
        </label>

        <label className="field">
          <span className="field-label">Что точно не стоит включать?</span>
          <input
            className="text-input"
            name="avoidSongs"
            type="text"
            placeholder="Жанры или песни, которые лучше пропустить"
            disabled={isSubmitting}
          />
        </label>

        <label className="field">
          <span className="field-label">Пожелание или сообщение нам</span>
          <textarea
            className="text-area"
            name="message"
            rows={4}
            placeholder="Будем рады вашим словам"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <button className="button button--primary button--full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправляем..." : "Отправить с любовью"}
      </button>

      <p
        className={status ? `status-note status-note--${status.tone}` : "status-note"}
        role="status"
        aria-live="polite"
      >
        {status?.message ?? ""}
      </p>
    </form>
  );
}
