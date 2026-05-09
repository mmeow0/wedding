import { storyMoments } from "../content";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function StorySection() {
  return (
    <section id="story" className="section-shell" aria-labelledby="story-title">
      <div className="section-frame">
        <Reveal>
          <SectionTitle
            centered
            script="мы вдвоём"
            title="Наша история"
            description="САМЫЕ ЛЮБИМЫЕ ГЛАВЫ, КОТОРЫЕ ПРИВЕЛИ НАС К ЭТОМУ ДНЮ."
          />
        </Reveal>

        <Reveal delay={60}>
          <p className="story-section__lead">
            Нам захотелось собрать здесь маленькую ленту воспоминаний: про места, где мы смеялись,
            влюблялись, заботились друг о друге и постепенно собирали нашу общую жизнь.
          </p>
        </Reveal>

        <div id="story-title" className="sr-anchor" aria-hidden="true" />

        <div className="story-stack">
          {storyMoments.map((moment, index) => (
            <Reveal key={`${moment.number}-${moment.title}`} delay={index * 80}>
              <article className={index % 2 === 1 ? "story-card story-card--reverse" : "story-card"}>
                <figure className="story-polaroid">
                  <div className="story-polaroid__frame">
                    <img
                      src={moment.image}
                      alt={moment.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width="900"
                      height="900"
                    />
                  </div>
                  <figcaption className="story-polaroid__caption">{moment.caption}</figcaption>
                </figure>

                <div className="story-copy">
                  <p className="story-copy__year">{moment.number}</p>
                  <h3 className="story-copy__title">{moment.title}</h3>
                  <p className="story-copy__text">{moment.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
