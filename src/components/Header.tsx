import type { NavigationItem } from "../content";

type HeaderProps = {
  readonly items: readonly NavigationItem[];
  readonly inHero: boolean;
};

export function Header({ items, inHero }: HeaderProps) {
  const visibleItems = items.filter((item) => item.id !== "hero" && item.id !== "story");

  return (
    <header className={inHero ? "site-header is-hero" : "site-header is-compact"}>
      <div className="site-header__frame surface-card surface-card--nav">
        <nav aria-label="Навигация по приглашению">
          <ul className="site-header__nav">
            {visibleItems.map((item) => (
              <li key={item.id}>
                <a className="site-header__link" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
