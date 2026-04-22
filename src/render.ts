import { createGuestUrl } from "./guest";
import type { Guest, WeddingDetails } from "./types";

type RenderInput = {
  readonly details: WeddingDetails;
  readonly guest: Guest;
  readonly origin: string;
  readonly pathname: string;
};

export function renderInvitation({ details, guest, origin, pathname }: RenderInput): string {
  const personalUrl = createGuestUrl(origin, pathname, guest.token);
  const guestName = escapeHtml(guest.name);

  return `
    <main>
      <section class="hero card" aria-labelledby="hero-title">
        <p class="soft-title">wedding</p>
        <p class="couple-name">${details.bride} & ${details.groom}</p>
        <img class="hero-art" src="/generated-couple.png" alt="Рисованная Айгуль и Евгений в свадебном образе" />
        <h1 id="hero-title">Мы женимся!</h1>
        <p class="hero__message">${capitalize(guestName)}, будем счастливы разделить этот день с вами.</p>
        <div class="hero__actions" aria-label="Основные действия">
          <a class="button button--primary" href="#rsvp">заполнить анкету</a>
          <a class="button button--secondary" href="#details">детали дня</a>
        </div>
      </section>

      <section class="card intro" aria-labelledby="intro-title">
        <p class="eyebrow">родные и близкие</p>
        <h2 id="intro-title">Собираем вечер, в котором будет много нежности, музыки и наших любимых людей.</h2>
        <p>
          Нам важно, чтобы рядом были те, с кем можно смеяться, обниматься, танцевать
          и запоминать этот день маленькими счастливыми деталями.
        </p>
        <div class="countdown" aria-label="Обратный отсчёт до свадьбы">
          <div><strong data-countdown="days">0</strong><span>дней</span></div>
          <div><strong data-countdown="hours">0</strong><span>часов</span></div>
          <div><strong data-countdown="minutes">0</strong><span>минут</span></div>
          <div><strong data-countdown="seconds">0</strong><span>секунд</span></div>
        </div>
      </section>

      <section class="card details" id="details" aria-labelledby="details-title">
        <p class="eyebrow">детали</p>
        <h2 id="details-title">Когда и где</h2>
        <div class="details__grid">
          <article class="detail">
            <span class="detail__label">Дата</span>
            <strong>${details.dateLabel}</strong>
          </article>
          <article class="detail">
            <span class="detail__label">Место</span>
            <strong>${details.venueName}</strong>
          </article>
          <article class="detail">
            <span class="detail__label">Адрес</span>
            <strong>${details.address}</strong>
          </article>
        </div>
        <a class="map-ticket" href="${details.mapUrl}" target="_blank" rel="noreferrer">
          <span>посмотреть на карте</span>
          <small>Яндекс Карты • маршрут до ресторана</small>
        </a>
      </section>

      <section class="card timeline" aria-labelledby="timeline-title">
        <p class="eyebrow">wedding program</p>
        <h2 id="timeline-title">Программа дня</h2>
        <ol class="timeline__list">
          ${details.timeline
            .map(
              (item) => `
                <li>
                  <time>${item.time}</time>
                  <span><strong>${item.title}</strong>${item.note}</span>
                </li>
              `
            )
            .join("")}
        </ol>
      </section>

      <section class="card story" aria-labelledby="story-title">
        <img class="small-art story-art" src="/generated-story.png" alt="Рисованные Айгуль и Евгений на прогулке среди зелени" loading="lazy" />
        <p class="eyebrow">про нас</p>
        <h2 id="story-title">Мы разные ровно настолько, чтобы каждый день был интересным.</h2>
        <p>
          В нашей паре есть спонтанные прогулки, свои шутки, любовь к красивым моментам
          и привычка держаться за руки даже в самый обычный день.
        </p>
      </section>

      <section class="card cats" aria-labelledby="cats-title">
        <img class="small-art cats-art" src="/generated-cats.png" alt="Рисованные кошечки Айгуль и Евгения" loading="lazy" />
        <p class="eyebrow">мяу-комитет</p>
        <h2 id="cats-title">Котики проверили: гости одобрены.</h2>
        <p>
          Они передают важное: приходите нарядными, хорошее настроение обязательно,
          а всё про еду и напитки лучше оставить в анкете ниже.
        </p>
      </section>

      <section class="card dress" aria-labelledby="dress-title">
        <p class="eyebrow">dress code</p>
        <h2 id="dress-title">Палитра под зелёный зал</h2>
        <p>Будет особенно красиво, если в образах появятся оттенки зелени, молочного, тёплого дерева и мягкого серого.</p>
        <div class="palette" aria-label="Цветовая палитра">
          ${details.dressCode.map((color) => `<span>${color}</span>`).join("")}
        </div>
      </section>

      <section class="card gifts" aria-labelledby="gifts-title">
        <img class="small-art gift-art" src="/generated-gift.png" alt="Рисованный конверт с лентой, цветами и кольцами" loading="lazy" />
        <p class="eyebrow">see you...</p>
        <h2 id="gifts-title">Самый желанный подарок — ваш приход.</h2>
        <p>
          А если захотите порадовать нас чем-то ещё, нам будет особенно приятно получить
          подарок в конверте: так он точно станет частью наших общих планов.
        </p>
      </section>

      <section class="card rsvp" id="rsvp" aria-labelledby="rsvp-title">
        <p class="eyebrow">survey</p>
        <h2 id="rsvp-title">Анкета для гостей</h2>
        <p>
          Заполните, пожалуйста, чтобы мы учли меню, напитки, аллергии и всё,
          что сделает вечер комфортнее.
        </p>
        <form class="rsvp__form" data-rsvp-form>
          <input type="hidden" name="token" value="${escapeAttribute(guest.token)}" />
          <input type="hidden" name="guestName" value="${escapeAttribute(guest.name)}" />

          <fieldset>
            <legend>Вы сможете прийти?</legend>
            <label><input name="attendance" type="radio" value="yes" required /> Да, с радостью</label>
            <label><input name="attendance" type="radio" value="unsure" /> Пока не уверены</label>
            <label><input name="attendance" type="radio" value="no" /> К сожалению, нет</label>
          </fieldset>

          <fieldset>
            <legend>Что предпочитаете выпить?</legend>
            <label><input name="drinks" type="checkbox" value="sparkling" /> Игристое</label>
            <label><input name="drinks" type="checkbox" value="wine" /> Вино</label>
            <label><input name="drinks" type="checkbox" value="cocktails" /> Коктейли</label>
            <label><input name="drinks" type="checkbox" value="non-alcohol" /> Безалкогольное</label>
          </fieldset>

          <label class="field">
            <span>Аллергии и ограничения в еде</span>
            <textarea name="allergens" rows="3" placeholder="Например: орехи, рыба, лактоза, вегетарианское меню"></textarea>
          </label>

          <label class="field">
            <span>Что ещё учесть по меню?</span>
            <textarea name="menuNotes" rows="3" placeholder="Любые пожелания, которые помогут нам выбрать меню"></textarea>
          </label>

          <label class="field">
            <span>Песня, под которую вы точно выйдете танцевать</span>
            <input name="song" type="text" placeholder="Можно оставить пустым, но нам очень любопытно" />
          </label>

          <label class="field">
            <span>Пожелание или маленькое сообщение нам</span>
            <textarea name="message" rows="3"></textarea>
          </label>

          <button class="button button--primary" type="submit">Отправить ответ</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </form>
      </section>

      <section class="card faq" aria-labelledby="faq-title">
        <p class="eyebrow">notes</p>
        <h2 id="faq-title">Коротко о важном</h2>
        <div class="faq__grid">
          <article><h3>Можно с детьми?</h3><p>Мы очень любим ваших малышей, но в этот вечер просим прийти без детей: количество мест строго ограничено.</p></article>
          <article><h3>Кому писать в день свадьбы?</h3><p>Лучше заранее оставить вопросы нам, а ближе к дате добавим контакт помощника.</p></article>
          <article><h3>Как добраться?</h3><p><a href="${details.mapUrl}" target="_blank" rel="noreferrer">Откройте точку на Яндекс Картах</a> и постройте маршрут.</p></article>
        </div>
      </section>

      <section class="card links" aria-labelledby="links-title">
        <div>
          <p class="eyebrow">Персональная ссылка</p>
          <h2 id="links-title">Эта ссылка уже с именем гостя</h2>
          <p>${personalUrl}</p>
        </div>
      </section>
    </main>
  `;
}

export function renderSuccessMessage(): string {
  return "Спасибо! Ответ сохранился, мы всё учтём.";
}

function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase("ru-RU") + value.slice(1);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
