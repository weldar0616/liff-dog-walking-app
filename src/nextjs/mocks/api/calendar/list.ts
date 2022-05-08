import { ResponseResolver, MockedRequest, restContext } from "msw";
import { formatTime } from "../../../libs/report";

const mockEvent = {
  kind: "",
  etag: "",
  id: "",
  status: "",
  htmlLink: "",
  created: "",
  updated: "",
  summary: "",
  description: "",
  creator: {
    email: "",
  },
  organizer: {
    displayName: "",
    email: "",
    self: true,
  },
  start: {
    date: "",
  },
  end: {
    date: "",
  },
  recurringEventId: "",
  originalStartTime: {
    date: "",
  },
  transparency: "",
  iCalUID: "",
  sequence: 1,
  reminders: {
    useDefault: false,
  },
  eventType: "",
};

const post: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  // FIXME: jest.useFakeTimers + msw is not working...
  const nowDate = new Date();
  const nowDateString = `${nowDate.getFullYear()}-${formatTime(
    nowDate.getMonth() + 1
  )}-${formatTime(nowDate.getDate())}`;

  const nextDate = new Date(nowDate.setDate(nowDate.getDate() + 1));
  const nextDateString = `${nextDate.getFullYear()}-${formatTime(
    nextDate.getMonth() + 1
  )}-${formatTime(nextDate.getDate())}`;

  return res(
    ctx.status(200),
    ctx.json([
      {
        startDate: nowDateString,
        period: 0,
        dispName: "today-mu",
        originalDispName: "today-mu",
        reportName: "today-morning-user",
        event: mockEvent,
      },
      {
        startDate: nextDateString,
        period: 0,
        dispName: "tomorrow-mu",
        originalDispName: "tomorrow-mu",
        reportName: "tomorrow-morning-user",
        event: mockEvent,
      },
      {
        startDate: nowDateString,
        period: 1,
        dispName: "today-nu",
        originalDispName: "today-nu",
        reportName: "today-night-user",
        event: mockEvent,
      },
      {
        startDate: nextDateString,
        period: 1,
        dispName: "tomorrow-nu",
        originalDispName: "tomorrow-nu",
        reportName: "tomorrow-night-user",
        event: mockEvent,
      },
    ])
  );
};

export default { post };
