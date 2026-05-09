import { useEffect, useState } from "react";

type CountdownProps = {
  readonly targetDate: string;
};

type CountdownValue = {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
};

const countdownDecorations = ["✿", "❀", "✿", "❀"] as const;

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownValue | null>(() => calculateCountdown(targetDate));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(calculateCountdown(targetDate));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [targetDate]);

  if (!timeLeft) {
    return <p className="countdown-finished">Этот день настал ✿</p>;
  }

  const items = [
    { value: timeLeft.days, label: "дней" },
    { value: timeLeft.hours, label: "часов" },
    { value: timeLeft.minutes, label: "минут" },
    { value: timeLeft.seconds, label: "секунд" }
  ];

  return (
    <div className="countdown-grid" aria-label="Обратный отсчёт до свадьбы">
      {items.map((item, index) => (
        <div key={item.label} className="countdown-card">
          <span className="countdown-card__flower" aria-hidden="true">
            {countdownDecorations[index] ?? "✿"}
          </span>
          <strong className="countdown-card__value">{String(item.value).padStart(2, "0")}</strong>
          <span className="countdown-card__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function calculateCountdown(targetDate: string): CountdownValue | null {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60)
  };
}
