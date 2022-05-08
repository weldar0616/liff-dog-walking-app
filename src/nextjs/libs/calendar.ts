import {
  CalendarEvent,
  EventDescription,
} from "../types/calendar";
import { DutyRosterData, FetchEventParameter } from "../types/dutyRoster";

const SERVICE_ACCOUNT_ID = process.env.GOOGLE_SERVICE_ACCOUNT_ID;
export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const CALENDAR_URL = process.env.GOOGLE_CALENDAR_URL;
const PRIVATE_KEY = process.env.CALENDAR_API_KEY;

export const Calendar = require("node-google-calendar");
export const config = {
  calendarUrl: CALENDAR_URL,
  serviceAcctId: SERVICE_ACCOUNT_ID,
  calendarId: CALENDAR_ID,
  key: PRIVATE_KEY,
  timezone: "UTC+09:00",
};

export const fetchDutyRosterDataList = async (
  params: FetchEventParameter
): Promise<DutyRosterData[]> => {
  const cal = new Calendar(config);
  const calEvents: CalendarEvent[] = await cal.Events.list(CALENDAR_ID, params);

  const process = (calEvent: CalendarEvent): DutyRosterData => {
    console.log({ calEvent });
    const sanitizedDescription = calEvent.description.replace(
      /<(\/?html-blob|br|\/?pre|\/?u)>/g,
      ""
    );
    const parseDescription = (jsonString: string): EventDescription => {
      try {
        return JSON.parse(jsonString);
      } catch {
        return JSON.parse(jsonString.slice(1, -1));
      }
    };
    const eventDescription = parseDescription(sanitizedDescription);
    return {
      startDate: calEvent.start.date,
      period: eventDescription.period,
      dispName: eventDescription.disp_name,
      originalDispName: eventDescription.org_disp_name,
      reportName: eventDescription.report_name,
      event: calEvent,
    };
  };
  const sort = (a: DutyRosterData, b: DutyRosterData) => {
    if (a.period !== b.period) {
      return a.period < b.period ? -1 : 1;
    }
    return a.startDate > b.startDate ? 1 : -1;
  };
  return calEvents.map(process).sort(sort);
};
