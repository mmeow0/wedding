import type { Guest, WeddingDetails } from "../types";

type HeroSectionProps = {
  readonly details: WeddingDetails;
  readonly guest: Guest;
};

export function HeroSection({ details, guest }: HeroSectionProps) {
  const weddingYear = new Date(details.dateIso).getFullYear();
  const guestName = guest.name ? capitalize(guest.name) : "Дорогой гость";

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <picture className="hero__background">
        <source media="(min-width: 921px)" srcSet="/design/hero-desktop.png" />
        <img
          src="/design/hero.png"
          alt="Акварельный пейзаж с озером, горами и цветами"
          className="hero__background-image"
        />
      </picture>
      <div className="hero__veil" aria-hidden="true" />

      <img
        src="/design/floral-corner.png"
        alt=""
        aria-hidden="true"
        className="hero__corner hero__corner--left"
      />
      <img
        src="/design/floral-corner.png"
        alt=""
        aria-hidden="true"
        className="hero__corner hero__corner--right"
      />

      <div className="hero__content">
        <p className="hero__script">{guestName}, с любовью приглашаем</p>
        <p className="eyebrow">
          {details.city} · {details.dateLabel} {weddingYear}
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-glow" aria-hidden="true" />
          <span className="hero__title-name">{details.bride}</span>
          <span className="hero__ampersand">&amp;</span>
          <span className="hero__title-name">{details.groom}</span>
        </h1>
        <div className="hero__actions">
          <a className="button button--secondary" href="#rsvp">
            Подтвердить присутствие
          </a>
          <a className="button button--outline" href="#details">
            Детали вечера
          </a>
        </div>
      </div>
    </section>
  );
}

function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase("ru-RU") + value.slice(1);
}
