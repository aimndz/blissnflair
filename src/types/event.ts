export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  userId: string;
  daysLeft?: number;
}
