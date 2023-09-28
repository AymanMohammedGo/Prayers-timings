/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const SelectUi = ({ data, selected, onChangeSelected, name }) => {
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };
  const flatProps = {
    options: data.map((option) => option.name),
  };
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      {...defaultProps}
      style={{
        background: "#af2e57",
        width: "20%",
        padding: "10px",
        borderRadius: "8px",
      }}
      id="controlled-demo"
      value={selected}
      onChange={(e) => {
        onChangeSelected(e.target.value);
      }}
      renderInput={(params) => (
        <TextField {...params} label={name} variant="standard" />
      )}
    />

    // <Select
    //   style={{ background: "#af2e57" }}
    //   labelId="demo-simple-select-filled-label"
    //   id="demo-simple-select-filled"
    //   value={selected}
    //   onChange={(e) => {
    //     onChangeSelected(e.target.value);
    //   }}
    // >
    //   {data.map((data) => (
    //     <MenuItem key={data.id} value={data}>
    //       {data.name}
    //     </MenuItem>
    //   ))}
    // </Select>
  );
};

export default SelectUi;
