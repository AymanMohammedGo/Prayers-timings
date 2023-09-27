/* eslint-disable no-unused-vars */
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import SelectUi from "./UI/SelectUi";
const SelectLocation = () => {
  let countryData = Country.getAllCountries();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const [city, setCity] = useState();

  useEffect(() => {
    setCityData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const setChangeCountry = (e) => {
    setCountry(e);
  };
  const setChangeCity = (e) => {
    setCity(e);
  };
  return (
    <Stack
      direction="row"
      justifyContent={"space-evenly"}
      style={{ margin: "40px" }}
    >
      <FormControl style={{ width: "20%" }}>
        <InputLabel id="demo-simple-select-label">
          <span style={{ color: "white" }}>البلد</span>
        </InputLabel>
        <SelectUi
          data={countryData}
          selected={country}
          onChangeSelected={setChangeCountry}
        />
      </FormControl>
      {city && (
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <SelectUi
            data={cityData}
            selected={city}
            onChangeSelected={setChangeCity}
          />
        </FormControl>
      )}
    </Stack>
  );
};

export default SelectLocation;
