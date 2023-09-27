/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const SelectUi = ({ data, selected, onChangeSelected }) => {
  return (
    <Select
      value={selected}
      onChange={(e) => {
        onChangeSelected(e.target.value);
      }}
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
