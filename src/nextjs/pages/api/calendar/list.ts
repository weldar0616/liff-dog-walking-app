import { NextApiRequest, NextApiResponse } from "next";
import { fetchEventsList } from "../../../libs/calendar";
import { FetchEventParameter } from "../../../types/calendar";
import { DutyRosterData } from "../../../types/dutyRoster";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: FetchEventParameter = JSON.parse(req.body);
  const response: DutyRosterData[] = await fetchEventsList(params);
  res.status(200).json(response);
}
