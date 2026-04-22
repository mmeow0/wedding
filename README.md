# Сайт-приглашение Айгуль и Евгения

Персонализация работает через параметр `guest` в ссылке:

```text
https://your-site.ru/?guest=demo-aigul-evgeniy
```

## Запуск

```bash
npm install
npm run dev
```

Локально без Supabase форма RSVP сохраняет ответы через встроенный Vite API в:

```text
data/rsvp-responses.json
```

## Supabase

Для реального сайта используйте Supabase:

1. Создайте Supabase project.
2. Выполните SQL из `supabase/schema.sql` в SQL Editor.
3. Добавьте переменные окружения в Vercel:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_INVITE_PHOTOS_BUCKET=guest-photos
```

`wedding_guests` хранит персональные ссылки: `token`, `name`, `photo_path` или `photo_url`.
`wedding_rsvps` хранит каждую отправку формы отдельной записью и привязывает её к `guest_token` и `guest_id`.

Если вы загружаете персональную картинку в Supabase Storage bucket `guest-photos`, укажите путь в `photo_path`, например:

```text
guest-token/image.png
```

Либо можно вставить полный публичный URL в `photo_url`.

Для продакшн-запуска с backend:

```bash
npm run start
```

## Как сделать ссылки для гостей

1. Создайте CSV-файл со списком гостей, по одному имени или обращению в строке.
2. Запустите:

```bash
npm run links -- guests.csv https://your-site.ru/
```

3. Скрипт выведет и массив для `src/data.ts`, и SQL `insert` для таблицы `wedding_guests`.

## Что сохраняется из формы

- имя гостя и его персональный токен;
- придёт ли гость;
- будет ли с +1;
- предпочтения по напиткам;
- аллергии и пожелания по меню;
- песня для танцев;
- сообщение для пары.

Сейчас ответы сохраняются в JSON-файл на сервере. Если сайт будет размещаться на хостинге без постоянной файловой системы, лучше подключить базу данных или отправку в Telegram/почту через отдельные секретные переменные.
