export type Guest = {
  readonly token: string;
  readonly name: string;
};

export type WeddingDetails = {
  readonly bride: string;
  readonly groom: string;
  readonly dateLabel: string;
  readonly dateIso: string;
  readonly guestArrivalTime: string;
  readonly city: string;
  readonly venueName: string;
  readonly address: string;
  readonly mapUrl: string;
  readonly dressCode: readonly string[];
  readonly timeline: readonly TimelineItem[];
};

export type TimelineItem = {
  readonly time: string;
  readonly title: string;
  readonly note: string;
};

export type RsvpPayload = {
  readonly token: string;
  readonly guestName: string;
  readonly attendance: "yes" | "no" | "unsure";
  readonly plusOne: "yes" | "no";
  readonly plusOneName: string;
  readonly drinks: readonly string[];
  readonly allergens: string;
  readonly menuNotes: string;
  readonly song: string;
  readonly message: string;
};
