import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import type { WeddingDetails } from "../types";

type DetailsSectionProps = {
  readonly details: WeddingDetails;
};

export function DetailsSection({ details }: DetailsSectionProps) {
  const weddingYear = new Date(details.dateIso).getFullYear();
  const cards = [
    { icon: "✿", label: "Дата", value: `${details.dateLabel} ${weddingYear}` },
    { icon: "◷", label: "Время", value: details.guestArrivalTime }
  ];

  return (
    <section id="details" className="section-shell" aria-labelledby="details-title">
      <div className="section-frame">
        <Reveal>
          <SectionTitle
            centered
            script="когда и где"
            title="Детали вечера"
            description="Собрали для вас самое важное: время встречи, площадку и быстрый маршрут до места праздника."
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

        <Reveal delay={200}>
          <article className="surface-card venue-card">
            <img
              src="/design/flower-sprig.png"
              alt=""
              aria-hidden="true"
              className="venue-card__sprig"
            />
            <p className="venue-card__title">{details.venueName}</p>
            <p className="venue-card__address">{details.address}</p>
            <a className="button button--outline" href={details.mapUrl} target="_blank" rel="noreferrer">
              Открыть на Яндекс Картах
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
