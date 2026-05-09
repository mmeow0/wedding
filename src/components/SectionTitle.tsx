type SectionTitleProps = {
  readonly script: string;
  readonly title: string;
  readonly description?: string;
  readonly centered?: boolean;
};

export function SectionTitle({
  script,
  title,
  description,
  centered = false
}: SectionTitleProps) {
  return (
    <header className={centered ? "section-heading section-heading--centered" : "section-heading"}>
      <p className="section-heading__script">{script}</p>
      <h2 className="section-heading__title">{title}</h2>
      <div className="ornament" aria-hidden="true">
        <span className="ornament__flower">✿</span>
      </div>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
