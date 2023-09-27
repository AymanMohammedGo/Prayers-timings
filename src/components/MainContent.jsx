import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import axios from "axios";
import moment from "moment/moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactCountryFlag from "react-country-flag";
import "moment/dist/locale/ar";
import SelectLocation from "./SelectLocation";
moment.locale("ar");
import Button from "@mui/material/Button";
export default function MainContent() {
  const prayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
      image: "/src/images/fajr-prayer.png",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
      image: "/src/images/dhhr-prayer-mosque.png",
    },
    {
      key: "Asr",
      displayName: "العصر",
      image: "/src/images/asr-prayer-mosque.png",
    },
    {
      key: "Sunset",
      displayName: "المغرب",
      image: "/src/images/sunset-prayer-mosque.png",
    },
    {
      key: "Isha",
      displayName: "العشاء",
      image: "/src/images/night-prayer-mosque.png",
    },
  ];
  //status

  const [timings, setTimings] = useState({
    Fajr: "04:06",
    Dhuhr: "11:27",
    Asr: "14:54",
    Sunset: "17:31",
    Isha: "19:01",
  });
  const [timingsForMonth, setTimingsForMonth] = useState([]);
  const [showtimingsForMonth, setShowtimingsForMonth] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  const [today, setToday] = useState("");
  const [locationDetail, setLocationDetail] = useState({
    city: "Aleppo",
    country: "Syria",
  });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const getLocation = async () => {
    const getLocationDetail = await axios.get(
      `http://ip-api.com/json/?fields=61439`
    );
    setLocationDetail(getLocationDetail.data);
  };
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/${moment().format(
        "dd-MM-yyyy"
      )}?city=${locationDetail.city}&country=${locationDetail.country}`
    );
    const reponse1 = await axios.get(
      `http://api.aladhan.com/v1/calendarByAddress/${moment().format(
        "yyyy/MM"
      )}?address=${locationDetail.city}`
    );

    setTimings(response.data.data.timings);
    console.log(locationDetail);
    setTimingsForMonth(reponse1.data.data);
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getTimings();
  }, [locationDetail]);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 0;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiffernce;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTime(
      `${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} :  ${durationRemainingTime.seconds()}`
    );
  };

  useEffect(() => {
    let interval = setInterval(() => {
      // setTimer((t) => {
      //   return t - 1;
      // });

      setupCountdownTimer();
      const t = moment();
      setToday(t.format("MMM Do YYYY | hh:mm:ss "));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  // const handleCityChange = (event) => {
  //   const cityObject = avilableCities.find((city) => {
  //     return city.apiName == event.target.value;
  //   });
  //   setSelectedCity(cityObject);
  // };
  return (
    <>
      {/* top row */}
      <SelectLocation
        countrylocation={locationDetail.country}
        citylocation={locationDetail.city}
      />
      <Grid container>
        <Grid xs={5}>
          <div>
            <h2>{today}</h2>
            <h1>{locationDetail.city}</h1>
          </div>
        </Grid>
        <Grid xs={5}>
          <div>
            <h2>Remains for the {prayersArray[nextPrayerIndex].key} prayer</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
        <Grid xs={2}>
          <div>
            <ReactCountryFlag
              countryCode={locationDetail.countryCode}
              svg
              style={{
                width: "10em",
                height: "11em",
              }}
              title="US"
            />
          </div>
        </Grid>
      </Grid>
      {/* top row */}
      <Divider style={{ borderColor: "white", opacity: 0.1 }} />
      {/*prayers cards*/}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="Fajr"
          time={timings.Fajr}
          image="/src/images/fajr-prayer.png"
        />
        <Prayer
          name="Dhuhr"
          time={timings.Dhuhr}
          image="/src/images/dhhr-prayer-mosque.png"
        />
        <Prayer
          name="Asr"
          time={timings.Asr}
          image="/src/images/asr-prayer-mosque.png"
        />
        <Prayer
          name="Sunset"
          time={timings.Sunset}
          image="/src/images/sunset-prayer-mosque.png"
        />
        <Prayer
          name="Isha"
          time={timings.Isha}
          image="/src/images/night-prayer-mosque.png"
        />
      </Stack>
      {/*prayers cards*/}
      {/*select city*/}
      {/* <Stack
        direction="row"
        justifyContent={"space-evenly"}
        style={{ margin: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.apiName}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((city) => (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack> */}
      {/*select city*/}
      {/* <Selectcity /> */}
      {/*table */}
      <Stack style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ padding: "10px", background: "#af2e57" }}
          variant="contained"
          color="success"
          onClick={() => {
            setShowtimingsForMonth(!showtimingsForMonth);
          }}
        >
          Show the monthly calendar
        </Button>
      </Stack>

      {showtimingsForMonth && (
        <TableContainer style={{ marginTop: "50px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">Fajr</TableCell>
                <TableCell align="center">Dhuhr</TableCell>
                <TableCell align="center">Asr</TableCell>
                <TableCell align="center">Sunset</TableCell>
                <TableCell align="center">Isha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timingsForMonth.map((data) => (
                <TableRow
                  key={data.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {data.date.readable}
                  </TableCell>
                  <TableCell align="center">{data.timings.Fajr}</TableCell>
                  <TableCell align="center">{data.timings.Dhuhr}</TableCell>
                  <TableCell align="center">{data.timings.Asr}</TableCell>
                  <TableCell align="center">{data.timings.Sunset}</TableCell>
                  <TableCell align="center">{data.timings.Isha}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/*table */}
    </>
  );
}
