// types/EventLog.ts
export interface EventLog {
  id: number;
  eventType: string;
  timestamp: string; // ISO format
  userId: string;
  details: string;
}
