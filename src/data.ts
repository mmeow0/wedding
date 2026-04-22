import type { Guest, WeddingDetails } from "./types";

export const weddingDetails: WeddingDetails = {
  bride: "Айгуль",
  groom: "Евгений",
  dateLabel: "4 июля",
  dateIso: "2026-07-04T18:00:00+03:00",
  guestArrivalTime: "18:00",
  city: "Москва",
  venueName: "ресторан Боярский",
  address: "Москва, ресторан Боярский",
  mapUrl: "https://yandex.ru/maps/-/CPClyG8P",
  dressCode: ["молочный", "шалфей", "пудровый", "графит", "шампань"],
  timeline: [
    {
      time: "18:00",
      title: "Встреча гостей",
      note: "обнимемся, познакомимся и начнём вечер с бокала"
    },
    {
      time: "18:30",
      title: "Ужин",
      note: "красивая еда, тосты и много разговоров"
    },
    {
      time: "20:00",
      title: "Музыка и танцы",
      note: "включаем праздничный режим"
    },
    {
      time: "22:00",
      title: "Торт",
      note: "сладкий финал и ещё немного магии"
    }
  ]
};

export const guests: readonly Guest[] = [
  {
    token: "demo-aigul-evgeniy",
    name: "дорогой гость"
  }
];
