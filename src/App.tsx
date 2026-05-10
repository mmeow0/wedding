import { startTransition, useEffect, useState } from "react";
import { navigationItems } from "./content";
import { weddingDetails } from "./data";
import { fetchGuest, getCurrentGuest, getGuestToken } from "./guest";
import { Countdown } from "./components/Countdown";
import { DetailsSection } from "./components/DetailsSection";
import { DressCodeSection } from "./components/DressCodeSection";
import { FaqSection } from "./components/FaqSection";
import { FinalSection } from "./components/FinalSection";
import { GiftSection } from "./components/GiftSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { Reveal } from "./components/Reveal";
import { RsvpForm } from "./components/RsvpForm";
import { SectionTitle } from "./components/SectionTitle";
import { StorySection } from "./components/StorySection";
import type { Guest } from "./types";

export function App() {
  const [guest, setGuest] = useState<Guest>(() => getCurrentGuest(window.location.search));
  const [isGuestLoading, setIsGuestLoading] = useState(() => Boolean(getGuestToken(window.location.search)));
  const [isHeaderInHero, setIsHeaderInHero] = useState(true);

  useEffect(() => {
    const token = getGuestToken(window.location.search);

    if (!token) {
      return;
    }

    let cancelled = false;
    let loadingTimer = 0;
    const loadingStartedAt = Date.now();

    void fetchGuest(token).then((resolvedGuest) => {
      if (cancelled) {
        return;
      }

      const completeLoading = () => {
        if (cancelled) {
          return;
        }

        startTransition(() => {
          setGuest(resolvedGuest);
          setIsGuestLoading(false);
        });
      };

      const remainingTime = Math.max(0, 550 - (Date.now() - loadingStartedAt));

      if (remainingTime === 0) {
        completeLoading();
        return;
      }

      loadingTimer = window.setTimeout(completeLoading, remainingTime);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (isGuestLoading) {
      return;
    }

    const handleScroll = (): void => {
      const hero = document.querySelector<HTMLElement>("#hero");

      if (!hero) {
        setIsHeaderInHero(false);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsHeaderInHero(heroBottom > 116);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isGuestLoading]);

  if (isGuestLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-shell">
      <img
        src="/design/cloud.png"
        alt=""
        aria-hidden="true"
        className="page-cloud page-cloud--one"
      />
      <img
        src="/design/cloud.png"
        alt=""
        aria-hidden="true"
        className="page-cloud page-cloud--two"
      />
      <img
        src="/design/cloud.png"
        alt=""
        aria-hidden="true"
        className="page-cloud page-cloud--three"
      />

      <Header items={navigationItems} inHero={isHeaderInHero} />

      <main className="invitation-page">
        <HeroSection details={weddingDetails} guest={guest} />

        <section className="section-shell section-shell--compact" aria-labelledby="countdown-title">
          <div className="section-frame section-frame--narrow">
            <Reveal>
              <SectionTitle
                centered
                script="Родные и близкие"
                title="Собираем вечер, в котором будет много нежности, музыки и наших любимых людей."
                description="Нам важно, чтобы рядом были те, с кем можно смеяться, обниматься, танцевать и запоминать этот день маленькими счастливыми деталями."
              />
              <div id="countdown-title" className="sr-anchor" aria-hidden="true" />
              <Countdown targetDate={weddingDetails.dateIso} />
            </Reveal>
          </div>
        </section>

        <DetailsSection details={weddingDetails} />
        <GiftSection guest={guest} />

        <section id="rsvp" className="section-shell" aria-labelledby="rsvp-title">
          <div className="section-frame section-frame--narrow">
            <Reveal>
              <SectionTitle
                centered
                script="будем рады знать"
                title="Анкета гостя"
                description="Пожалуйста, заполните форму, чтобы мы могли всё учесть и подготовить вечер максимально комфортно."
              />
            </Reveal>
            <Reveal delay={120}>
              <div id="rsvp-title" className="sr-anchor" aria-hidden="true" />
              <RsvpForm guest={guest} />
            </Reveal>
          </div>
        </section>

        <DressCodeSection dressCode={weddingDetails.dressCode} />

        <FaqSection mapUrl={weddingDetails.mapUrl} />
        <StorySection />
        <FinalSection />
      </main>
    </div>
  );
}
