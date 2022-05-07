const Calendar = require("node-google-calendar");

const SERVICE_ACCOUNT_ID = process.env.GOOGLE_SERVICE_ACCOUNT_ID;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const CALENDAR_URL = process.env.GOOGLE_CALENDAR_URL;
const PRIVATE_KEY = process.env.CALENDAR_API_KEY;

const config = {
  calendarUrl: CALENDAR_URL,
  serviceAcctId: SERVICE_ACCOUNT_ID,
  calendarId: CALENDAR_ID,
  key: PRIVATE_KEY,
  timezone: "UTC+09:00",
};

// TODO: getServerSidePropsの方とまとめる

export default async function handler(req, res) {
  const cal = new Calendar(config);
  const calEvents = JSON.parse(req.body);

  const event1 = await cal.Events.update(CALENDAR_ID, calEvents[0].event.id, {
    ...calEvents[0].event,
    description: JSON.stringify({
      period: calEvents[0].period,
      disp_name: calEvents[1].disp_name,
      org_disp_name: calEvents[0].org_disp_name,
    }),
  });
  const event2 = await cal.Events.update(CALENDAR_ID, calEvents[1].event.id, {
    ...calEvents[1].event,
    description: JSON.stringify({
      period: calEvents[1].period,
      disp_name: calEvents[0].disp_name,
      org_disp_name: calEvents[1].org_disp_name,
    }),
  });

  res.status(200).json([event1, event2]);
}
