import { Reveal } from "./Reveal";
import type { Guest } from "../types";

type GiftSectionProps = {
  readonly guest: Guest;
};

export function GiftSection({ guest }: GiftSectionProps) {
  const imageSrc = guest.photoUrl || "/design/gift.jpeg";
  const imageAlt = guest.photoUrl ? `Фото ${guest.name}` : "Белый котик с цветами";

  return (
    <section className="section-shell" aria-labelledby="gift-title">
      <div className="section-frame section-frame--narrow">
        <Reveal>
          <div className="surface-card gift-card">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="gift-card__image"
              loading="lazy"
            />
            <p className="section-heading__script">о подарке</p>
            <div className="ornament" aria-hidden="true">
              <span className="ornament__flower">✿</span>
            </div>
            <h2 id="gift-title" className="gift-card__quote">
              Самый желанный подарок — видеть вас рядом
            </h2>
            <p className="gift-card__text">
              А если захотите порадовать нас чем-то ещё, нам будет особенно приятно получить
              подарок в конверте: так он станет тёплой поддержкой в начале нашей семейной жизни.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
