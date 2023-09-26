/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const SelectUi = ({ data, selected, setCountry }) => {
  return (
    <Select
      value={selected.name}
      onChange={setCountry}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Age"
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
