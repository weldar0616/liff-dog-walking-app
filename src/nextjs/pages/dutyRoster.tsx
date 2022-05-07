import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { arraySplit } from "../libs/array";
import { fetchEventsList } from "../libs/calendar";
import { formatTime, isMorning, isNight } from "../libs/report";

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

const DutyRosterCell = ({
  handleClick,
  outline,
  fontStyle,
  bgColor,
  dispName,
}) => {
  return (
    <TableCell
      align="center"
      onClick={handleClick}
      sx={{
        outline: outline,
        color: fontStyle.color,
        fontWeight: fontStyle.weight,
        backgroundColor: bgColor,
      }}
    >
      {dispName}
    </TableCell>
  );
};

const DutyRosterTable: NextPage<Props> = ({ calEvents, width }: Props) => {
  // REVIEW: state リフトアップ?
  const [selectedRoster, setSelectedRoster] = useState(
    Array(calEvents.length).fill(false)
  );
  const [state, setState] = useState({ calEvents });
  const [loading, setLoading] = useState(false);

  const distinct = (v) => v.period === 0;
  const dateList = calEvents.filter(distinct).map((calEvent) => {
    const date = new Date(calEvent.start_date);
    return {
      dayOfWeek: dayOfWeeksMap[date.getDay()],
      day: `${date.getMonth() + 1}/${date.getDate()}`,
    };
  });

  // console.log("DutyRosterTable", { calEvents });
  // console.log({ dateList });

  const calcSelectedRosterIdx = (key = "1-2") => {
    const prop = key.split("-").map(Number);
    return (prop[0] * selectedRoster.length) / 2 + prop[1];
  };

  const handleClick = (event) => {
    console.log({ event });
    const idx = calcSelectedRosterIdx(event);
    // 現在のtrueの数が0or1なら、操作可能
    // 現在のtrueの数が2なら、既にtrueの場合のみ操作可能
    if (selectedRoster.filter((v) => v === true).length >= 2) {
      if (selectedRoster[idx] === true) {
        setSelectedRoster(selectedRoster.map((v, i) => (i === idx ? !v : v)));
      }
      return;
    }
    setSelectedRoster(selectedRoster.map((v, i) => (i === idx ? !v : v)));
    console.log({ selectedRoster });
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("handleSubmit");
    const selectedCalEvents = selectedRoster
      .map((v, i) => (v ? state.calEvents[i] : null))
      .filter((v) => v !== null);
    console.log({ selectedCalEvents });

    const updatedCalEvents = await fetch("/api/calendar/update", {
      method: "POST",
      body: JSON.stringify(selectedCalEvents),
    })
      .then((res) => res.json())
      .catch(() => {
        // TODO: エラー表示
      });

    console.log({ updatedCalEvents });
    const beforeDispNames = selectedCalEvents.map((v) => v.disp_name);
    const nextState = state;
    for (let i = 0; i < selectedRoster.length; i++) {
      if (selectedRoster[i]) {
        const updatedCalEvent = updatedCalEvents.shift();
        nextState.calEvents[i] = {
          start_date: state.calEvents[i].start_date,
          period: state.calEvents[i].period,
          disp_name: beforeDispNames.pop(),
          org_disp_name: state.calEvents[i].org_disp_name,
          event: updatedCalEvent,
        };
      }
    }
    setState(nextState);
    setSelectedRoster(selectedRoster.map((v) => (v = false)));
    setLoading(false);
  };

  // TODO: 交換ボタン リフトアップ
  return (
    <>
      {loading && <LinearProgress color="secondary" />}
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
            {/* TODO: avoid any type */}
            {arraySplit<any>(state.calEvents, state.calEvents.length / 2).map(
              (rows, li) => (
                <TableRow key={li}>
                  {rows.map((row, i) => {
                    const key = `${li}-${i}`;
                    const outline =
                      new Date().getDate() ===
                        Number(row.start_date.split("-")[2]) &&
                      ((isMorning() && row.period === 0) ||
                        (isNight() && row.period === 1))
                        ? "auto"
                        : "none";
                    const fontStyle =
                      row.disp_name === row.org_disp_name
                        ? {
                            color: "black",
                            weight: "normal",
                          }
                        : { color: "blue", weight: "bold" };
                    const bgColor = selectedRoster[calcSelectedRosterIdx(key)]
                      ? "lightgreen"
                      : "none";
                    return (
                      <DutyRosterCell
                        key={key}
                        handleClick={() => handleClick(key)}
                        outline={outline}
                        fontStyle={fontStyle}
                        bgColor={bgColor}
                        dispName={row.disp_name}
                      />
                    );
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedRoster.filter((v) => v === true).length < 2}
        >
          交換
        </Button>
      </Box>
    </>
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
      q: 'roster',
      timeMin: `${cy}-${cm}-${cd}T00:00:00+09:00`,
      timeMax: `${ny}-${nm}-${nd}T00:00:00+09:00`,
      maxResults: 30,
      singleEvents: true,
      orderBy: "startTime",
    };
  };

  const params = createCalendarListParams(new Date());
  const processedCalEvents = await fetchEventsList(params);
  console.log({ processedCalEvents });

  return {
    props: {
      calEvents: processedCalEvents,
    },
  };
};

export default DutyRoster;
