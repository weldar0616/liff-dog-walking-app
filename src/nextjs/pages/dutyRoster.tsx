import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { arraySplit } from "../libs/array";
import { formatTime } from "../libs/report";

interface Props {
  width?: number;
  calEvents?: any;
}

const dayOfWeeksMap = {
  0: "日",
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
};

const NOTICE = "🐢の餌やり: 1日1回、朝。4月下旬〜。1回5粒、食べるなら10粒。";

const DutyRosterTable: NextPage<Props> = ({ calEvents, width }: Props) => {
  console.log("DutyRosterTable", { calEvents });
  for (const calEvent of calEvents) {
    console.log(
      calEvent.start_date,
      calEvent.period,
      calEvent.disp_name,
      calEvent.org_disp_name
    );
  }

  const distinct = (val, i, self) =>
    self.findIndex((e) => e.start_date === val.start_date) === i;
  const dateList = calEvents.filter(distinct).map((calEvent) => {
    const date = new Date(calEvent.start_date);
    return {
      dayOfWeek: dayOfWeeksMap[date.getDay()],
      day: `${date.getMonth() + 1}/${date.getDate()}`,
    };
  });

  console.log({ dateList });

  return (
    <TableContainer>
      <Table sx={{ width }}>
        <TableHead>
          <TableRow>
            {dateList.map((dayOfWeek, i) => (
              <TableCell key={i} align="center">
                {dayOfWeek.dayOfWeek}
                <br />
                {dayOfWeek.day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO: avoid any */}
          {arraySplit<any>(calEvents, calEvents.length / 2).map((rows, li) => (
            <TableRow key={li}>
              {rows.map((row, i) => (
                <TableCell key={`${li}-${i}`} align="center">
                  {row.disp_name}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const NoticeText: NextPage = () => <div>{NOTICE}</div>;

const DutyRoster: NextPage<Props> = ({ calEvents }: Props) => {
  // TODO: custom hooks
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);

  return (
    <Stack spacing={2}>
      <DutyRosterTable calEvents={calEvents} width={windowSize.width} />
      <NoticeText />
    </Stack>
  );
};

const SERVICE_ACCOUNT_ID = process.env.GOOGLE_SERVICE_ACCOUNT_ID;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const CALENDAR_URL = process.env.GOOGLE_CALENDAR_URL;
const PRIVATE_KEY = process.env.CALENDAR_API_KEY;

export const getServerSideProps: GetServerSideProps = async () => {
  const createCalendarListParams = (currentDate: Date) => {
    const cy = currentDate.getFullYear();
    const cm = formatTime(currentDate.getMonth() + 1);
    const cd = formatTime(currentDate.getDate());

    const twoWeeksLater = new Date(
      currentDate.setDate(currentDate.getDate() + 14)
    );
    const ny = twoWeeksLater.getFullYear();
    const nm = formatTime(twoWeeksLater.getMonth() + 1);
    const nd = formatTime(twoWeeksLater.getDate());
    // prettier-ignore
    return {
      timeMin: `${cy}-${cm}-${cd}T00:00:00+09:00`,
      timeMax: `${ny}-${nm}-${nd}T00:00:00+09:00`,
      maxResults: 30,
      singleEvents: true,
      orderBy: "startTime",
    };
  };

  // TODO: types
  const Calendar = require("node-google-calendar");
  const config = {
    calendarUrl: CALENDAR_URL,
    serviceAcctId: SERVICE_ACCOUNT_ID,
    calendarId: CALENDAR_ID,
    key: PRIVATE_KEY,
    timezone: "UTC+09:00",
  };
  const calId = config.calendarId;
  const cal = new Calendar(config);

  const params = createCalendarListParams(new Date());
  console.log({ params });
  const calEvents = await cal.Events.list(calId, params);

  const process = (calEvent) => {
    const description = JSON.parse(
      calEvent.description
        .replace(/<(\/?html-blob|br|\/?pre)>/g, "")
        .slice(1, -1)
    );
    return {
      start_date: calEvent.start.date,
      period: description.period,
      disp_name: description.disp_name,
      org_disp_name: description.org_disp_name,
    };
  };
  const sort = (a, b) => {
    // if (a.start_date !== b.start_date) {
    //   return a.start_date < b.start_date ? -1 : 1;
    // }
    // return a.period > b.period;
    if (a.period !== b.period) {
      return a.period < b.period ? -1 : 1;
    }
    return a.start_date > b.start_date;
  };
  const processedCalEvents = calEvents.map(process).sort(sort);

  console.log({ processedCalEvents });

  return {
    props: {
      calEvents: processedCalEvents,
    },
  };
};

export default DutyRoster;
