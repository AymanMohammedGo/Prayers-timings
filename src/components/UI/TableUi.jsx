/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment/moment";

const TableUi = ({ timingsForMonth, name }) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table
        style={{ background: "#af2e5708" }}
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              date
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              {name == "Gregorian" ? "hijri" : "Gregorian"}
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Imsak
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Fajr
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Sunrise
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Dhuhr
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Asr
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Sunset
            </TableCell>
            <TableCell
              style={{
                fontWeight: "900",
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#af2e57",
              }}
              align="center"
            >
              Isha
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timingsForMonth.map((data) => (
            <TableRow
              style={
                moment().format("DD-MM-YYYY") == data.date.gregorian.date
                  ? { backgroundColor: "#af2e573b" }
                  : { backgroundColor: "white" }
              }
              key={data.date.gregorian.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {data.date.gregorian.date}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {data.date.hijri.date}
              </TableCell>
              <TableCell align="center">{data.timings.Imsak}</TableCell>
              <TableCell align="center">{data.timings.Fajr}</TableCell>
              <TableCell align="center">{data.timings.Sunrise}</TableCell>
              <TableCell align="center">{data.timings.Dhuhr}</TableCell>
              <TableCell align="center">{data.timings.Asr}</TableCell>
              <TableCell align="center">{data.timings.Sunset}</TableCell>
              <TableCell align="center">{data.timings.Isha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUi;
