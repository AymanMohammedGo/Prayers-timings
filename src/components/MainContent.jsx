import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import moment from "moment/moment";
import "moment/dist/locale/ar";
moment.locale("ar");
export default function MainContent() {
  const avilableCities = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
    },
    {
      displayName: "الدمام",
      apiName: "Dommam",
    },
  ];

  const prayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Sunset",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];
  //status
  const [timings, setTimings] = useState({
    Fajr: "03:57",
    Dhuhr: "12:59",
    Asr: "16:55",
    Sunset: "20:12",
    Isha: "22:02",
  });

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
  });
  const [today, setToday] = useState("");
  const [timer, setTimer] = useState(10);
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );

    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      // setTimer((t) => {
      //   return t - 1;
      // });
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | hh:mm:ss "));

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

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
      // console.log(moment(timings["Sunset"], "hh:mm"));
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
    const remainingTime = momentNow.diff(moment(nextPrayerTime, "hh:mm"));
    console.log(remainingTime);
    //const isha = timings["Isha"];
    //const ishaMoment = moment(isha, "hh:mm");
    //console.log(momentNow.isBefore(ishaMoment));
  };
  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObject);
  };
  return (
    <>
      {/* top row */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
            <h1>{timer}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي على صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>00:10:20</h1>
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
          name="الفجر"
          time={timings.Fajr}
          image="/src/images/fajr-prayer.png"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="/src/images/dhhr-prayer-mosque.png"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="/src/images/asr-prayer-mosque.png"
        />
        <Prayer
          name="المغرب"
          time={timings.Sunset}
          image="/src/images/sunset-prayer-mosque.png"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="/src/images/night-prayer-mosque.png"
        />
      </Stack>
      {/*prayers cards*/}
      {/*select city*/}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/*select city*/}
    </>
  );
}
