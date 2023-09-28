/* eslint-disable no-unused-vars */
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import SelectUi from "./UI/SelectUi";
const SelectLocation = ({
  onChangeCountry,
  onChangecity,
  city,
  country,
  countryData,
  cityData,
}) => {
  const setChangeCountry = (e) => {
    onChangeCountry(e);
  };
  const setChangeCity = (e) => {
    onChangecity(e);
  };
  return (
    <Stack
      direction="row"
      justifyContent={"space-evenly"}
      style={{ margin: "40px" }}
    >
      {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">
          <span style={{ color: "white" }}>Country</span>
        </InputLabel> */}
      <SelectUi
        data={countryData}
        selected={country}
        onChangeSelected={setChangeCountry}
        name="Country"
      />
      {/* </FormControl> */}
      {city && (
        // <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        //   <InputLabel id="demo-simple-select-filled-label">
        //     <span style={{ color: "white" }}>City</span>
        //   </InputLabel>
        <SelectUi
          data={cityData}
          selected={city}
          onChangeSelected={setChangeCity}
          name="City"
        />
        //</FormControl>
      )}
    </Stack>
  );
};

export default SelectLocation;
