import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import type { Guest } from "../types";

type GiftSectionProps = {
  readonly guest: Guest;
};

export function GiftSection({ guest }: GiftSectionProps) {
  const fallbackImageSrc = "/design/gift.jpeg";
  const preferredImageSrc = `/guests/${encodeURIComponent(guest.token)}/photo.jpeg`;
  const [imageSrc, setImageSrc] = useState(preferredImageSrc);

  useEffect(() => {
    setImageSrc(preferredImageSrc);
  }, [preferredImageSrc]);

  const imageAlt = imageSrc === fallbackImageSrc ? "Белый котик с цветами" : `Фото ${guest.name}`;

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
              onError={() => {
                if (imageSrc !== fallbackImageSrc) {
                  setImageSrc(fallbackImageSrc);
                }
              }}
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
