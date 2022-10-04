// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = {
    Content: "application/json",
    Authorization: `Bearer ${process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN}`,
    "Access-Control-Allow-Origin": "*",
  };
  const { message } = JSON.parse(req.body);

  try {
    await axios({
      method: "POST",
      url: "https://api.line.me/v2/bot/message/broadcast",
      headers,
      data: {
        messages: [{ type: "text", text: message }],
      },
    });
  } catch (err) {
    res.status(500);
    res.statusMessage = axios.isAxiosError(err) ? err.message : '[Error] messaging api';
    return;
  }

  res.status(200).json({ message });
}