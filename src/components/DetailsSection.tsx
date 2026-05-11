import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import type { Guest, WeddingDetails } from "../types";

type DetailsSectionProps = {
  readonly details: WeddingDetails;
  readonly guest: Guest;
};

export function DetailsSection({ details, guest }: DetailsSectionProps) {
  const weddingYear = new Date(details.dateIso).getFullYear();
  const restaurantDepartureTime = "18:30";
  const hasCeremonyInvite = Boolean(
    guest.attendsCeremony &&
      details.ceremony?.time &&
      details.ceremony.venueName &&
      details.ceremony.address &&
      details.ceremony.mapUrl
  );
  const cards = [
    { icon: "✿", label: "Дата", value: `${details.dateLabel} ${weddingYear}` },
    {
      icon: "◷",
      label: "Время",
      value: hasCeremonyInvite ? details.ceremony!.time : details.guestArrivalTime
    }
  ];

  return (
    <section id="details" className="section-shell" aria-labelledby="details-title">
      <div className="section-frame">
        <Reveal>
          <SectionTitle
            centered
            script="когда и где"
            title="Детали вечера"
            description={
              hasCeremonyInvite
                ? "Для тебя собрали маршрут дня: в 17:30 встречаемся на росписи, а в 18:30 вместе едем в ресторан Боярский."
                : "Собрали для тебя самое важное: время встречи, площадку и быстрый маршрут до места праздника."
            }
          />
        </Reveal>

        <div id="details-title" className="sr-anchor" aria-hidden="true" />

        <div className="info-grid">
          {cards.map((card, index) => (
            <Reveal key={card.label} delay={index * 90}>
              <article className="surface-card info-card">
                <div className="info-card__icon" aria-hidden="true">
                  {card.icon}
                </div>
                <p className="info-card__label">{card.label}</p>
                <p className="info-card__value">{card.value}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {hasCeremonyInvite ? (
          <Reveal delay={200}>
            <article className="surface-card venue-card venue-card--route">
              <img
                src="/design/flower-sprig.png"
                alt=""
                aria-hidden="true"
                className="venue-card__sprig"
              />

              <div className="venue-route__section">
                <p className="venue-card__eyebrow">Ждём тебя на росписи</p>
                <p className="venue-card__time">{details.ceremony!.time}</p>
                <p className="venue-card__title">{details.ceremony!.venueName}</p>
                <p className="venue-card__address">{details.ceremony!.address}</p>
                <a
                  className="button button--outline"
                  href={details.ceremony!.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть на Яндекс Картах
                </a>
              </div>

              <div className="venue-route__divider" aria-hidden="true" />

              <div className="venue-route__section">
                <p className="venue-card__time">{restaurantDepartureTime}</p>
                   <p className="venue-card__title">Ресторан Боярский</p>
                <p className="venue-card__address">{details.address}</p>
                <a className="button button--outline" href={details.mapUrl} target="_blank" rel="noreferrer">
                  Открыть на Яндекс Картах
                </a>
              </div>
            </article>
          </Reveal>
        ) : (
          <div className="venue-stack">
            <Reveal delay={200}>
              <article className="surface-card venue-card">
                <img
                  src="/design/flower-sprig.png"
                  alt=""
                  aria-hidden="true"
                  className="venue-card__sprig"
                />
                <p className="venue-card__eyebrow">Ждём тебя на празднике</p>
                <p className="venue-card__time">{details.guestArrivalTime}</p>
                <p className="venue-card__title">{details.venueName}</p>
                <p className="venue-card__address">{details.address}</p>
                <a className="button button--outline" href={details.mapUrl} target="_blank" rel="noreferrer">
                  Открыть на Яндекс Картах
                </a>
              </article>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
