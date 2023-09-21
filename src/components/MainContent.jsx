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
      key: "c1",
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
    },
    {
      key: "c2",
      displayName: "الرياض",
      apiName: "Riyadh",
    },
    {
      key: "c3",
      displayName: "الدمام",
      apiName: "Dommam",
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
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );

    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();

    const t = moment();
    setToday(t.format("MMMM Do YYYY | h:mm:ss"));
    console.log(moment().format("LT"));
  }, [selectedCity]);

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
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي على صلاة العصر</h2>
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
                <MenuItem key={city.key} value={city.apiName}>
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
