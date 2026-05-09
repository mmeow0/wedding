import { useState } from "react";
import { faqItems } from "../content";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type FaqSectionProps = {
  readonly mapUrl: string;
};

export function FaqSection({ mapUrl }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="section-shell" aria-labelledby="faq-title">
      <div className="section-frame section-frame--narrow">
        <Reveal>
          <SectionTitle
            centered
            script="коротко о важном"
            title="Частые вопросы"
            description="Если у вас останутся ещё вопросы, просто напишите нам: мы с радостью подскажем."
          />
        </Reveal>

        <div id="faq-title" className="sr-anchor" aria-hidden="true" />

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <Reveal key={item.id} delay={index * 70}>
                <article className={isOpen ? "surface-card faq-card is-open" : "surface-card faq-card"}>
                  <button
                    id={buttonId}
                    className="faq-card__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpenId((current) => (current === item.id ? null : item.id));
                    }}
                  >
                    <span className="faq-card__question">
                      <span className="faq-card__marker" aria-hidden="true">
                        ✿
                      </span>
                      {item.question}
                    </span>
                    <span className="faq-card__chevron" aria-hidden="true">
                      +
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className="faq-card__panel"
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                    {item.showsMapLink ? (
                      <a className="button button--ghost" href={mapUrl} target="_blank" rel="noreferrer">
                        Открыть карту
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
