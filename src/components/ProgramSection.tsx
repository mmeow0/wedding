import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import type { TimelineItem } from "../types";

type ProgramSectionProps = {
  readonly timeline: readonly TimelineItem[];
};

export function ProgramSection({ timeline }: ProgramSectionProps) {
  return (
    <section id="program" className="section-shell section-shell--soft" aria-labelledby="program-title">
      <div className="section-frame section-frame--narrow">
        <Reveal>
          <SectionTitle
            centered
            script="расписание"
            title="Программа дня"
            description="План вечера останется живым и тёплым, но основные ориентиры мы для тебя уже собрали."
          />
        </Reveal>

        <div id="program-title" className="sr-anchor" aria-hidden="true" />

        <Reveal delay={120}>
          <div className="surface-card program-card">
            <ol className="program-list">
              {timeline.map((item, index) => (
                <li key={`${item.time}-${item.title}`} className="program-item">
                  <time className="program-item__time">{item.time}</time>
                  <div className="program-item__content">
                    <span className="program-item__flower" aria-hidden="true">
                      ✿
                    </span>
                    <strong className="program-item__title">{item.title}</strong>
                    <p className="program-item__note">{item.note}</p>
                    {index === timeline.length - 1 ? null : <div className="program-item__divider" aria-hidden="true" />}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
