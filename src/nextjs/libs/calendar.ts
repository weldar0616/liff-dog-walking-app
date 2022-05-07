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

export const fetchEventsList = async (params) => {
  // TODO: types
  const cal = new Calendar(config);
  const calEvents = await cal.Events.list(CALENDAR_ID, params);

  const process = (calEvent) => {
    console.log({ calEvent });
    const sanitizedDesc = calEvent.description.replace(
      /<(\/?html-blob|br|\/?pre|\/?u)>/g,
      ""
    );
    const parse = (jsonString: string) => {
      try {
        return JSON.parse(jsonString);
      } catch {
        return JSON.parse(jsonString.slice(1, -1));
      }
    };
    const descriptionObj = parse(sanitizedDesc);
    return {
      start_date: calEvent.start.date,
      period: descriptionObj.period,
      disp_name: descriptionObj.disp_name,
      org_disp_name: descriptionObj.org_disp_name,
      event: calEvent,
    };
  };
  const sort = (a, b) => {
    if (a.period !== b.period) {
      return a.period < b.period ? -1 : 1;
    }
    return a.start_date > b.start_date;
  };
  return calEvents.map(process).sort(sort);
};
