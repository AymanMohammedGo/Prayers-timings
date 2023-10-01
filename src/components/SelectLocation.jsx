/* eslint-disable no-unused-vars */
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

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
      justifyContent={"space-between"}
      alignItems="center"
      margin="30px 0px 20px 0px"
    >
      <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">
          <span
            style={{
              color: "white",
              fontSize: "1rem",
            }}
          >
            Country
          </span>
        </InputLabel>
        <SelectUi
          data={countryData}
          selected={country}
          onChangeSelected={setChangeCountry}
        />
      </FormControl>

      <Button
        style={{
          fontWeight: "900",
          fontSize: "1rem",
          padding: "10px",
          background: "rgb(69 98 149)",
          margin: "20px 0px",
        }}
        variant="contained"
        color="success"
        onClick={() => {
          window.scrollTo(0, 600);
        }}
      >
        Monthly calendar
      </Button>
      <Button
        style={{
          fontWeight: "900",
          fontSize: "1rem",
          padding: "10px",
          background: "rgb(69 98 149)",
          margin: "20px 0px",
        }}
        variant="contained"
        color="success"
        onClick={() => {
          window.scrollTo(0, 600);
        }}
      >
        Contact us
      </Button>
      <Button
        style={{
          fontWeight: "900",
          fontSize: "1rem",
          padding: "10px",
          background: "rgb(69 98 149)",
          margin: "20px 0px",
        }}
        variant="contained"
        color="success"
        onClick={() => {
          window.scrollTo(0, 600);
        }}
      >
        different topics
      </Button>

      {city && (
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-filled-label">
            <span
              style={{
                color: "white",
                fontSize: "1rem",
              }}
            >
              City
            </span>
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
