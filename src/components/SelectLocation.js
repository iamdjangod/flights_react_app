import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchAirports } from "../services/flightInfoService";

export default function SelectLocation({ passLocationChange, label="Enter"}) {
  const [locations, setLocations] = useState([]);

  const handleLocationChange = async (event) => {
    let inputValue = event.target.value;

    if (inputValue !== "" && inputValue.length >= 3) {
      try {
        const result = await fetchAirports(inputValue);
        setLocations(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLocationSelect = (event, value) => {
    passLocationChange(value);
  };

  return (
    <Autocomplete
      onChange={handleLocationSelect}
      options={locations}
      autoHighlight
      getOptionLabel={(data) => data.presentation.suggestionTitle}
      renderInput={(params) => (
        <TextField
          onChange={handleLocationChange}
          {...params}
          label={label}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "off",
            },
            inputLabel: {
              shrink: true
            }
          }}
        />
      )}
    />
  );
}
