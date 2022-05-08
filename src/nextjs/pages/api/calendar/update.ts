import { NextApiRequest, NextApiResponse } from "next";
import { Calendar, CALENDAR_ID, config } from "../../../libs/calendar";
import { DutyRosterData } from "../../../types/dutyRoster";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cal = new Calendar(config);
  const calEvents: DutyRosterData[] = JSON.parse(req.body);

  const response: DutyRosterData[] = [
    await cal.Events.update(CALENDAR_ID, calEvents[0].event.id, {
      ...calEvents[0].event,
      description: JSON.stringify({
        period: calEvents[0].period,
        disp_name: calEvents[1].dispName,
        org_disp_name: calEvents[0].originalDispName,
        report_name: calEvents[1].reportName,
      }),
    }),
    await cal.Events.update(CALENDAR_ID, calEvents[1].event.id, {
      ...calEvents[1].event,
      description: JSON.stringify({
        period: calEvents[1].period,
        disp_name: calEvents[0].dispName,
        org_disp_name: calEvents[1].originalDispName,
        report_name: calEvents[0].reportName,
      }),
    }),
  ];

  res.status(200).json(response);
}
