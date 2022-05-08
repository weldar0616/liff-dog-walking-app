import { NextApiRequest, NextApiResponse } from "next";
import { fetchDutyRosterDataList } from "../../../libs/calendar";
import { DutyRosterData, FetchEventParameter } from "../../../types/dutyRoster";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params: FetchEventParameter = JSON.parse(req.body);
  const response: DutyRosterData[] = await fetchDutyRosterDataList(params);
  res.status(200).json(response);
}
