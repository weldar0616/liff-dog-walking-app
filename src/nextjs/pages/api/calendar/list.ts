import { fetchEventsList } from "../../../libs/calendar";

export default async function handler(req, res) {
  const params = JSON.parse(req.body);
  const response = await fetchEventsList(params);
  res.status(200).json(response);
}
