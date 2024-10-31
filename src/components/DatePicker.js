import { TextField } from "@mui/material";

export default function DatePicker({ handleDateChange, label }) {
  return (
    <TextField
      type="date"
      onChange={handleDateChange}
      sx={{ width: "100%" }}
      label={label}
      slotProps={{
        htmlInput: {
          min: new Date().toISOString().split("T")[0],
        },
        inputLabel: {
          shrink: true,
        },
      }}
    ></TextField>
  );
}
