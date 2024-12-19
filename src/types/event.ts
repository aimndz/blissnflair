export interface Event {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  expectedPax: number;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  additionalServices?: string[];
  additionalNotes?: string;
  status: string;
  userId: string;
  daysLeft?: number;
  createdAt: string;
  modifiedAt: string;
  venue: string;
}

export type CreateEventData = Omit<Event, "id" | "status" | "userId">;
