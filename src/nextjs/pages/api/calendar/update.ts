import { Calendar, CALENDAR_ID, config } from "../../../libs/calendar";

export default async function handler(req, res) {
  const cal = new Calendar(config);
  const calEvents = JSON.parse(req.body);

  const response = [
    await cal.Events.update(CALENDAR_ID, calEvents[0].event.id, {
      ...calEvents[0].event,
      description: JSON.stringify({
        period: calEvents[0].period,
        disp_name: calEvents[1].disp_name,
        org_disp_name: calEvents[0].org_disp_name,
        report_name: calEvents[1].report_name,
      }),
    }),
    await cal.Events.update(CALENDAR_ID, calEvents[1].event.id, {
      ...calEvents[1].event,
      description: JSON.stringify({
        period: calEvents[1].period,
        disp_name: calEvents[0].disp_name,
        org_disp_name: calEvents[1].org_disp_name,
        report_name: calEvents[0].report_name,
      }),
    }),
  ];

  res.status(200).json(response);
}
