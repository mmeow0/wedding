import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import type { WeddingDetails } from "../types";

type DressCodeSectionProps = {
  readonly dressCode: WeddingDetails["dressCode"];
};

const colorTokens: Record<string, { hex: string; label: string }> = {
  "молочный": { hex: "#efe1c9", label: "Молочный" },
  "шалфей": { hex: "#bccbaa", label: "Шалфей" },
  "пудровый": { hex: "#8fa286", label: "Пудрово-зелёный" },
  "графит": { hex: "#a2a7a2", label: "Тёплый серый" },
  "шампань": { hex: "#c58f57", label: "Шампань" }
};

export function DressCodeSection({ dressCode }: DressCodeSectionProps) {
  return (
    <section className="section-shell section-shell--compact" aria-labelledby="dress-code-title">
      <div className="section-frame section-frame--narrow">
        <Reveal>
          <>
            <SectionTitle
              centered
              script="будем рады видеть"
              title="Дресс-код"
              description="Будет особенно красиво, если в образах появятся оттенки зелени, молочного, тёплого дерева и мягкого серого."
            />
            <div id="dress-code-title" className="sr-anchor" aria-hidden="true" />
          </>
        </Reveal>
        <Reveal delay={120}>
          <div className="surface-card dress-code-card">
            <div className="dress-code-palette" aria-label="Рекомендуемая палитра дресс-кода">
              {dressCode.map((color) => {
                const swatch = colorTokens[color] ?? { hex: "#d7d8d0", label: color };

                return (
                  <span
                    key={color}
                    className="dress-code-palette__swatch"
                    style={{ "--swatch-color": swatch.hex } as CSSProperties}
                    title={swatch.label}
                    aria-label={swatch.label}
                  />
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
