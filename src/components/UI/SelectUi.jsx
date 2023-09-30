/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const SelectUi = ({ data, selected, onChangeSelected }) => {
  return (
    <Select
      style={{ background: "#af2e57" }}
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={selected}
      onChange={(e) => {
        onChangeSelected(e.target.value);
      }}
    >
      {data.map((data) => (
        <MenuItem key={data.id} value={data}>
          {data.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectUi;
