import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const dayOfWeeks = [" ", "日", "月", "火", "水", "木", "金", "土"];

// べた書き...
const USER1 = "マ";
const USER2 = "麻";
const USER3 = "光";
const rowsList = [
  ["朝", USER3, USER1, USER2, USER2, USER2, USER3, USER3],
  ["夜", USER1, USER1, USER3, USER1, USER1, USER1, USER2],
];

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

export default function DutyRoster() {
  return <DutyRosterTable />;
}
