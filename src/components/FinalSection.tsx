import { Reveal } from "./Reveal";

export function FinalSection() {
  return (
    <>
      <section className="section-shell section-shell--final" aria-labelledby="final-title">
        <div className="section-frame section-frame--narrow">
          <Reveal>
            <div className="surface-card final-card">
              <img
                src="/design/flower-sprig.png"
                alt=""
                aria-hidden="true"
                className="final-card__floral"
              />
              <div className="ornament" aria-hidden="true">
                <span className="ornament__flower">✿</span>
              </div>
              <h2 id="final-title" className="final-card__quote">
                Будем счастливы видеть тебя рядом в этот день
              </h2>
              <p className="final-card__signature">
                Айгуль и Евгений
                <span className="final-card__heart" aria-hidden="true">
                  <svg viewBox="0 0 160 160" role="presentation" focusable="false">
                    <path
                      d="M79 142C67 127 54 112 42 95C30 78 20 60 18 42C16 26 24 17 37 17C51 17 64 28 79 53C94 28 107 17 121 17C134 17 142 26 140 42C138 60 128 78 116 95C104 112 91 127 79 142"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31 36C31 26 39 22 48 24C59 27 68 38 76 54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M127 36C127 26 119 22 110 24C99 27 90 38 82 54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </p>
              <a className="button button--primary" href="#rsvp">
                Заполнить анкету
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="page-footer">4 · 07 · с любовью ✿</footer>
    </>
  );
}
