/* eslint-disable no-unused-vars */
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import SelectUi from "./UI/SelectUi";
const SelectLocation = () => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);
  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

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
          setCountry={setCountry}
        />
      </FormControl>
      {state && (
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <SelectUi data={stateData} selected={state} setSelected={setState} />
        </FormControl>
      )}
    </Stack>
  );
};

export default SelectLocation;
