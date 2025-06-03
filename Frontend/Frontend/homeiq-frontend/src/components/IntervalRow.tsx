import React from "react";
import { TemperatureInterval } from "../types/temperature";
import { TextField, Box } from "@mui/material";

interface Props {
  interval: TemperatureInterval;
  index: number;
  onChange: (index: number, updated: TemperatureInterval) => void;
}

const IntervalRow: React.FC<Props> = ({ interval, index, onChange }) => {
  const handleChange = (field: keyof TemperatureInterval, value: string | number) => {
    onChange(index, {
      ...interval,
      [field]: field === "temperature" ? Number(value) : value,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
      <TextField
        label="Start"
        type="time"
        value={interval.start}
        size="small"
        onChange={e => handleChange("start", e.target.value)}
        style={{ width: 100 }}
        inputProps={{ step: 300 }}
      />
      <TextField
        label="End"
        type="time"
        value={interval.end}
        size="small"
        onChange={e => handleChange("end", e.target.value)}
        style={{ width: 100 }}
        inputProps={{ step: 300 }}
      />
      <TextField
        label="Temp (°C)"
        type="number"
        value={interval.temperature}
        size="small"
        onChange={e => handleChange("temperature", e.target.value)}
        style={{ width: 100 }}
      />
    </Box>
  );
};

export default IntervalRow;