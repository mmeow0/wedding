import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import type { Guest, WeddingDetails, WeddingVenue } from "../types";

type DetailsSectionProps = {
  readonly details: WeddingDetails;
  readonly guest: Guest;
};

export function DetailsSection({ details, guest }: DetailsSectionProps) {
  const weddingYear = new Date(details.dateIso).getFullYear();
  const hasCeremonyInvite = Boolean(
    guest.attendsCeremony &&
      details.ceremony?.time &&
      details.ceremony.venueName &&
      details.ceremony.address &&
      details.ceremony.mapUrl
  );
  const cards = [
    { icon: "✿", label: "Дата", value: `${details.dateLabel} ${weddingYear}` },
    ...(hasCeremonyInvite ? [{ icon: "◷", label: "Роспись", value: details.ceremony!.time }] : []),
    {
      icon: hasCeremonyInvite ? "⌂" : "◷",
      label: hasCeremonyInvite ? "Ресторан" : "Время",
      value: details.guestArrivalTime
    }
  ];
  const venues: Array<{ eyebrow: string; venue: WeddingVenue }> = hasCeremonyInvite
    ? [
        { eyebrow: "Сначала ждём вас на росписи", venue: details.ceremony! },
        {
          eyebrow: "После этого встречаемся в ресторане",
          venue: {
            time: details.guestArrivalTime,
            venueName: details.venueName,
            address: details.address,
            mapUrl: details.mapUrl
          }
        }
      ]
    : [
        {
          eyebrow: "Ждём вас на празднике",
          venue: {
            time: details.guestArrivalTime,
            venueName: details.venueName,
            address: details.address,
            mapUrl: details.mapUrl
          }
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
                ? "Для вас собрали весь маршрут дня: сначала роспись, а потом тёплый вечер в ресторане Боярский."
                : "Собрали для вас самое важное: время встречи, площадку и быстрый маршрут до места праздника."
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

        <div className="venue-stack">
          {venues.map(({ eyebrow, venue }, index) => (
            <Reveal key={`${eyebrow}-${venue.venueName}`} delay={200 + index * 120}>
              <article className="surface-card venue-card">
                <img
                  src="/design/flower-sprig.png"
                  alt=""
                  aria-hidden="true"
                  className="venue-card__sprig"
                />
                <p className="venue-card__eyebrow">{eyebrow}</p>
                <p className="venue-card__time">{venue.time}</p>
                <p className="venue-card__title">{venue.venueName}</p>
                <p className="venue-card__address">{venue.address}</p>
                <a className="button button--outline" href={venue.mapUrl} target="_blank" rel="noreferrer">
                  Открыть на Яндекс Картах
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
