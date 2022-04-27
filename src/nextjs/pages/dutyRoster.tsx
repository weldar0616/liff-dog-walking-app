import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";

const dayOfWeeks = [" ", "日", "月", "火", "水", "木", "金", "土"];

// べた書き... TODO: DB定義
const USER1 = "マ";
const USER2 = "麻";
const USER3 = "光";
// TODO: 定数モジュールに移す
const rowsList = [
  ["朝", USER3, USER1, USER2, USER2, USER2, USER3, USER3],
  ["夜", USER1, USER1, USER3, USER1, USER1, USER1, USER2],
];
const NOTICE = "🐢の餌やり: 1日1回、朝。4月下旬〜。1回5粒、食べるなら10粒。";

// FIXME: react-jsx-dev-runtime.development.js?bfcc:117 Warning: Each child in a list should have a unique "key" prop.
function DutyRosterTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {dayOfWeeks.map((dayOfWeek) => (
              <TableCell>{dayOfWeek}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsList.map((rows) => (
            <TableRow>
              {rows.map((row) => (
                <TableCell>{row}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function NoticeText() {
  return <div>{NOTICE}</div>;
}

export default function DutyRoster() {
  return (
    <Stack spacing={2}>
      <DutyRosterTable />
      <NoticeText />
    </Stack>
  );
}
