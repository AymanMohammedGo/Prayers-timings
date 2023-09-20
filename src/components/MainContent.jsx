import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
export default function MainContent() {
  // const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <>
      {/* top row */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>سبتمبر 9 20233 | 4:20</h2>
            <h1>مكة المكرمة</h1>
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
        <Prayer name="الفجر" time="04:10" image="/src/images/fajr-prayer.png" />
        <Prayer
          name="الظهر"
          time="06:10"
          image="/src/images/dhhr-prayer-mosque.png"
        />
        <Prayer
          name="العصر"
          time="07:10"
          image="/src/images/asr-prayer-mosque.png"
        />
        <Prayer
          name="المغرب"
          time="08:10"
          image="/src/images/sunset-prayer-mosque.png"
        />
        <Prayer
          name="العشاء"
          time="09:10"
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
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/*select city*/}
    </>
  );
}
