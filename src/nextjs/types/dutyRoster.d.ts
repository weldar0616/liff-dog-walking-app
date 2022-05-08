import { CalendarEvent } from "./calendar";

export type DutyRosterData = {
  startDate: string;
  period: 0 | 1;
  dispName: string;
  originalDispName: string;
  reportName: string;
  event: CalendarEvent;
};

export type FetchEventParameter = {
  q?: string;
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
  singleEvents?: boolean;
  orderBy?: string = "startTime";
};
