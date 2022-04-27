import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { NextPage } from "next";

const dayOfWeeks = [" ", "日", "月", "火", "水", "木", "金", "土"];

// TODO: DB定義
const USER1 = "マ";
const USER2 = "麻";
const USER3 = "光";
// TODO: 定数モジュールに移す
const rowsList = [
  ["朝", USER3, USER1, USER2, USER2, USER2, USER3, USER3],
  ["夜", USER1, USER1, USER3, USER1, USER1, USER1, USER2],
];
const NOTICE = "🐢の餌やり: 1日1回、朝。4月下旬〜。1回5粒、食べるなら10粒。";

const DutyRosterTable: NextPage = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {dayOfWeeks.map((dayOfWeek, i) => (
              <TableCell key={i}>{dayOfWeek}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsList.map((rows, li) => (
            <TableRow key={li}>
              {rows.map((row, i) => (
                <TableCell key={`${li}-${i}`}>{row}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const NoticeText: NextPage = () => <div>{NOTICE}</div>;

const DutyRoster: NextPage = () => {
  return (
    <Stack spacing={2}>
      <DutyRosterTable />
      <NoticeText />
    </Stack>
  );
};

export default DutyRoster;
