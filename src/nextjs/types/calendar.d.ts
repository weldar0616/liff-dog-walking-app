export type CalendarEvent = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: string;
  };
  organizer: {
    displayName: string;
    email: string;
    self: boolean;
  };
  start: {
    date: string;
  };
  end: {
    date: string;
  };
  recurringEventId: string;
  originalStartTime: {
    date: string;
  };
  transparency: string;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
};

export type EventDescription = {
  period: 0 | 1;
  disp_name: string;
  org_disp_name: string;
  report_name: string;
};
