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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { arraySplit } from "../libs/array";
import { fetchDutyRosterDataList } from "../libs/calendar";
import { formatTime, isMorning, isNight } from "../libs/report";
import { CalendarEvent } from "../types/calendar";
import { DutyRosterData, FetchEventParameter } from "../types/dutyRoster";

type FontStyle = {
  color: string;
  weight: string;
};

interface DutyRosterCellProps {
  handleClick: () => void;
  outline: string;
  fontStyle: FontStyle;
  bgColor: string;
  dispName: string;
}
interface DutyRosterTableProps {
  dutyRosterDataList: DutyRosterData[];
  width: number;
}
interface DutyRosterProps {
  dutyRosterDataList: DutyRosterData[];
}

type State = {
  dutyRosterDataList: DutyRosterData[];
};

type DutyRosterDate = {
  dayOfWeek: string;
  day: string;
};

const dayOfWeeks = ["日", "月", "火", "水", "木", "金", "土"];

const NOTICE = "🐢の餌やり: 1日1回、朝。4月下旬〜。1回5粒、食べるなら10粒。";

const DutyRosterCell: NextPage<DutyRosterCellProps> = ({
  handleClick,
  outline,
  fontStyle,
  bgColor,
  dispName,
}: DutyRosterCellProps) => {
  return (
    <TableCell
      align="center"
      onClick={handleClick}
      sx={{
        outline: outline,
        color: fontStyle.color,
        fontWeight: fontStyle.weight,
        backgroundColor: bgColor,
        paddingLeft: "2px",
        paddingRight: "2px",
      }}
    >
      {dispName}
    </TableCell>
  );
};

const DutyRosterTable: NextPage<DutyRosterTableProps> = ({
  dutyRosterDataList,
  width,
}: DutyRosterTableProps) => {
  // REVIEW: state リフトアップ?
  const [selectedRoster, setSelectedRoster] = useState<boolean[]>(
    Array(dutyRosterDataList.length).fill(false)
  );
  const [state, setState] = useState<State>({ dutyRosterDataList });
  const [loading, setLoading] = useState<boolean>(false);

  const distinct = (v: DutyRosterData) => v.period === 0;
  const dutyRosterDateList: DutyRosterDate[] = dutyRosterDataList
    .filter(distinct)
    .map((dutyRosterData) => {
      const date = new Date(dutyRosterData.startDate);
      return {
        dayOfWeek: dayOfWeeks[date.getDay()],
        day: `${date.getMonth() + 1}/${date.getDate()}`,
      };
    });

  const calcSelectedRosterIdx = (key = "1-2"): number => {
    const prop = key.split("-").map(Number);
    return (prop[0] * selectedRoster.length) / 2 + prop[1];
  };

  const handleClick = (idxString: string): void => {
    const idx = calcSelectedRosterIdx(idxString);
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
    const selectedRosterDataList: DutyRosterData[] = selectedRoster
      .map((v, i) => (v ? state.dutyRosterDataList[i] : null))
      .filter((v): v is NonNullable<DutyRosterData> => v !== null);
    console.log({ selectedRosterDataList });

    const updatedCalEvents: CalendarEvent[] = await fetch(
      "/api/calendar/update",
      {
        method: "POST",
        body: JSON.stringify(selectedRosterDataList),
      }
    )
      .then((res) => res.json())
      .catch(() => {
        // TODO: エラー表示
      });

    console.log({ updatedCalEvents });
    const beforeDispNames = selectedRosterDataList.map(
      (v: DutyRosterData) => v.dispName
    );
    const beforeReportNames = selectedRosterDataList.map(
      (v: DutyRosterData) => v.reportName
    );
    const nextState = state;
    for (let i = 0; i < selectedRoster.length; i++) {
      if (selectedRoster[i]) {
        const updatedCalEvent = updatedCalEvents.shift();
        if (!updatedCalEvent) continue;
        nextState.dutyRosterDataList[i] = {
          startDate: state.dutyRosterDataList[i].startDate,
          period: state.dutyRosterDataList[i].period,
          dispName: beforeDispNames.pop() || "",
          originalDispName: state.dutyRosterDataList[i].originalDispName,
          reportName: beforeReportNames.pop() || "",
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer>
        <Table sx={{ width }}>
          <TableHead>
            <TableRow>
              {dutyRosterDateList.map((dutyRosterDate, i) => (
                <TableCell key={i} align="center">
                  {dutyRosterDate.dayOfWeek}
                  <br />
                  {dutyRosterDate.day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* TODO: avoid any type */}
            {arraySplit<DutyRosterData>(
              state.dutyRosterDataList,
              state.dutyRosterDataList.length / 2
            ).map((dutyRosterDataList, li) => (
              <TableRow key={li}>
                {dutyRosterDataList.map((dutyRosterData, i) => {
                  const key = `${li}-${i}`;
                  const outline =
                    new Date().getDate() ===
                      Number(dutyRosterData.startDate.split("-")[2]) &&
                    ((isMorning() && dutyRosterData.period === 0) ||
                      (isNight() && dutyRosterData.period === 1))
                      ? "auto"
                      : "none";
                  const fontStyle: FontStyle =
                    dutyRosterData.dispName === dutyRosterData.originalDispName
                      ? {
                          color: "black",
                          weight: "normal",
                        }
                      : { color: "blue", weight: "bold" };
                  const bgColor = selectedRoster[calcSelectedRosterIdx(key)]
                    ? "lightgreen"
                    : "none";
                  const dispName =
                    dutyRosterData.dispName === dutyRosterData.originalDispName
                      ? dutyRosterData.dispName
                      : `${dutyRosterData.originalDispName}→${dutyRosterData.dispName}`;
                  return (
                    <DutyRosterCell
                      key={key}
                      handleClick={() => handleClick(key)}
                      outline={outline}
                      fontStyle={fontStyle}
                      bgColor={bgColor}
                      dispName={dispName}
                    />
                  );
                })}
              </TableRow>
            ))}
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

const DutyRoster: NextPage<DutyRosterProps> = ({
  dutyRosterDataList,
}: DutyRosterProps) => {
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
      <DutyRosterTable
        dutyRosterDataList={dutyRosterDataList}
        width={windowSize.width}
      />
      <NoticeText />
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const createCalendarListParams = (currentDate: Date): FetchEventParameter => {
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
  const dutyRosterDataList = await fetchDutyRosterDataList(params);
  console.log({ dutyRosterDataList: dutyRosterDataList });

  return {
    props: {
      dutyRosterDataList,
    },
  };
};

export default DutyRoster;
