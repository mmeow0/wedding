import type { Guest, WeddingDetails } from "./types";

type RenderInput = {
  readonly details: WeddingDetails;
  readonly guest: Guest;
};

export function renderInvitation({ details, guest }: RenderInput): string {
  const guestName = escapeHtml(guest.name);
  const storyCards = [
    {
      image: "/history-01.png",
      alt: "Рисованные Айгуль, Евгений и Ильдар в тёплом путешествии к морю",
      title: "Всё началось с Геленджика",
      text: "Одна поездка к морю с Ильдаром вдруг стала началом большой истории: там мы с Женей подружились, много смеялись и совсем не заметили, как познакомились по-настоящему.",
    },
    {
      image: "/history-02.png",
      alt: "Рисованные Айгуль и Евгений держатся за руки на вечерней прогулке",
      title: "Потом стало просто хорошо вместе",
      text: "Мы всё чаще виделись с Женей и Каримом, зависали, болтали обо всём на свете, а где-то между шутками и долгими вечерами поняли, что уже влюбились. Тогда Женя и предложил встречаться.",
    },
    {
      image: "/history-03.png",
      alt: "Рисованные Айгуль и Евгений на фоне Петербурга",
      title: "Первое большое «вместе» — Питер",
      text: "Одной из первых наших больших совместных поездок стал Петербург: ветер с Невы, красивые фасады, долгие прогулки и чувство, что рядом именно тот человек.",
    },
    {
      image: "/history-04.png",
      alt: "Рисованный Евгений копает траншею на даче, а Айгуль рядом",
      title: "Романтика бывает и с лопатой",
      text: "В нашей истории есть не только путешествия, но и очень земная любовь: Женя копает нам траншею на даче, а я в этот момент ещё сильнее убеждаюсь, что надёжность тоже очень романтична.",
    },
    {
      image: "/history-05.png",
      alt: "Рисованные Айгуль и Евгений в путешествии по Беларуси",
      title: "Первая заграница — Беларусь",
      text: "Первый совместный выезд за границу случился совсем рядом, но запомнился особенно: мы были счастливы уже от самого факта, что открываем новые места вместе.",
    },
    {
      image: "/history-06.png",
      alt: "Рисованные Айгуль и Евгений с белой голубоглазой Кощькой в Казани",
      title: "Из Казани мы вернулись не одни",
      text: "В Казани нас ждала отдельная судьбоносная встреча: там мы забрали бездомного котёнка, которую назвали Кощькой. Так в нашей истории стало ещё больше любви, лапок и ответственности.",
    },
    {
      image: "/history-07.png",
      alt: "Рисованные Айгуль и Евгений в путешествии по Грузии и Армении",
      title: "Грузия и Армения",
      text: "Мы ездили по красивым дорогам, смотрели горы, ловили солнце, ели что-то очень вкусное и в который раз понимали: путешествовать друг с другом нам удивительно легко.",
    },
    {
      image: "/history-08.png",
      alt: "Рисованные Айгуль и Евгений празднуют первый Новый год вместе",
      title: "Первый Новый год вдвоём",
      text: "Наш первый Новый год вместе был особенно тёплым: с домашним уютом, ожиданием чудес и тем самым ощущением, когда хочется, чтобы так было ещё много-много лет.",
    },
    {
      image: "/history-09.png",
      alt: "Рисованная Кощька рядом с арбузом",
      title: "Кощька и арбуз",
      text: "У любой большой истории есть свои маленькие легенды. Одна из наших — это Кощька с арбузом: кадр, который невозможно не любить и невозможно забыть.",
    },
    {
      image: "/history-10.png",
      alt: "Рисованные Айгуль и Евгений в Японии среди сакуры",
      title: "Япония и то самое «да»",
      text: "Весной мы полетели в Японию на цветение сакуры, и там, на горячих источниках, Женя сделал мне предложение. С этого момента наша история зазвучала совсем по-новому.",
    },
    {
      image: "/history-11.png",
      alt: "Рисованные Айгуль и Евгений в тёплом путешествии по Турции",
      title: "А потом была Турция",
      text: "Ещё одно наше счастливое «вместе» случилось в Турции: тёплый воздух, яркие улицы, море впечатлений и привычное чувство дома, потому что дом уже давно друг в друге.",
    },
    {
      image: "/history-12.png",
      alt: "Рисованные Айгуль и Евгений забирают чёрную кошечку Снежу из московского подвала",
      title: "А потом у нас появилась Снежа",
      text: "После Турции в нашей жизни случилась ещё одна важная встреча: уже в Москве мы забрали из подвала чёрного бездомного котёнка Снежу. Так наша семья стала ещё больше и ещё пушистее.",
    },
    {
      image: "/history-13.png",
      alt: "Рисованные Айгуль и Евгений со своими котами",
      title: "Теперь мы дружная кото-семья",
      text: "И вот так шаг за шагом, поездка за поездкой, шутка за шуткой мы пришли сюда — уже не просто вдвоём, а со своими хвостатыми спутниками. Теперь мы настоящая дружная кото-семья.",
    },
  ];

  return `
    <main>
      <section class="hero card" aria-labelledby="hero-title">
        <p class="soft-title">wedding</p>
        <p class="couple-name">${details.bride} & ${details.groom}</p>
        <img class="hero-art" src="/generated-couple.png" alt="Рисованная Айгуль и Евгений в свадебном образе" />
        <h1 id="hero-title">Мы женимся</h1>
        <p class="hero__message">${capitalize(guestName)}, будем счастливы разделить этот день вместе.</p>
        <div class="hero__actions" aria-label="Основные действия">
          <a class="button button--primary" href="#rsvp">заполнить анкету</a>
          <a class="button button--secondary" href="#details">детали дня</a>
          <a class="button button--secondary" href="#history">наша история</a>
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
        <img class="small-art gift-art" src="${escapeAttribute(guest.photoUrl ?? "/generated-gift.png")}" alt="${guest.photoUrl ? `Персональная памятная картинка для ${guestName}` : "Рисованный конверт с лентой, цветами и кольцами"}" loading="lazy" />
        <p class="eyebrow">see you...</p>
        <h2 id="gifts-title">Самый желанный подарок — видеть вас рядом.</h2>
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

      <section class="card history" id="history" aria-labelledby="history-title">
        <p class="eyebrow">наша история</p>
        <h2 id="history-title">Самые любимые главы, которые привели нас к этому дню.</h2>
        <p class="history__intro">
          Нам захотелось собрать здесь маленькую ленту воспоминаний: про места, где мы смеялись,
          влюблялись, заботились друг о друге и постепенно собирали нашу общую жизнь.
        </p>
        <div class="history__list">
          ${storyCards
            .map(
              (item, index) => `
                <article class="history-card">
                  <img class="history-card__art" src="${item.image}" alt="${item.alt}" loading="lazy" />
                  <div class="history-card__content">
                    <span class="history-card__index">${String(index + 1).padStart(2, "0")}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </div>
                </article>
              `
            )
            .join("")}
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
