import React, { useEffect, useState } from "react";
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
import { City, Country, State } from "country-state-city";

export default function MainContent() {
  let countryData = Country.getAllCountries();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const [city, setCity] = useState();

  useEffect(() => {
    setCityData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  const selectCity = () => {
    const ci = cityData.find((e) => {
      return e.name == locationDetail.regionName;
    });
    setCity(ci);
  };

  useEffect(() => {
    if (country.name == locationDetail.country) {
      cityData && selectCity();
    } else {
      cityData && setCity(cityData[0]);
    }
  }, [cityData]);
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
  const [remainingTime, setRemainingTime] = useState("");

  const [today, setToday] = useState("");
  const [locationDetail, setLocationDetail] = useState({
    city: "Aleppo",
    country: "Syria",
    regionName: "regionName",
  });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const getLocation = async () => {
    const getLocationDetail = await axios.get(
      `http://ip-api.com/json/?fields=61439`
    );
    setLocationDetail(getLocationDetail.data);

    const co = countryData.find((e) => {
      return e.isoCode == getLocationDetail.data.countryCode;
    });

    setCountry(co);
  };
  const getTimings = async () => {
    if (city && country) {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/${moment().format(
          "dd-MM-yyyy"
        )}?city=${city.name}&country=${country.name}`
      );
      setTimings(response.data.data.timings);
    } else if (country && !city) {
      const response2 = await axios.get(
        `https://api.aladhan.com/v1/timings/${moment().format(
          "dd-MM-yyyy"
        )}?latitude=${country.latitude}&longitude=${country.longitude}`
      );
      setTimings(response2.data.data.timings);
    }
    if (cityData) {
      const reponse1 = await axios.get(
        `https://api.aladhan.com/v1/calendarByCity/${moment().format(
          "yyyy/MM"
        )}?city=${city.name}&country=${country.name}`
      );
      console.log(reponse1.data.data);
      setTimingsForMonth(reponse1.data.data);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getTimings();
  }, [country, city]);

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

  return (
    <>
      <SelectLocation
        city={city}
        country={country}
        countryData={countryData}
        cityData={cityData}
        onChangeCountry={setCountry}
        onChangecity={setCity}
      />

      <Grid container>
        <Grid xs={5}>
          <div>
            <h2>{today}</h2>
            <h1>
              {city
                ? country.name == "Syria"
                  ? city.name.slice(0, -12)
                  : city.name
                : country.name}
            </h1>
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
              countryCode={country.isoCode}
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
        style={{ marginTop: "50px", justifyContent: "space-between" }}
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
      <Paper
        style={{ marginTop: "20px" }}
        sx={{ width: "100%", overflow: "hidden" }}
      >
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
                  hijri
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
                  key={data.name}
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
      </Paper>
    </>
  );
}
