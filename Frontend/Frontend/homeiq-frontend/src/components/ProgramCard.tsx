import React from "react";
import { TemperatureProgram } from "../types/temperature";
import { Card, CardContent, Typography, Button, Divider, Box } from "@mui/material";
import IntervalRow from "./IntervalRow";

interface Props {
  program: TemperatureProgram;
  isActive: boolean;
  onSelect: (name: string) => void;
  onUpdate: (updated: TemperatureProgram) => void;
  onSave: (name: string) => void;
}

const ProgramCard: React.FC<Props> = ({ program, isActive, onSelect, onUpdate, onSave }) => {
  const handleIntervalChange = (idx: number, updated: any) => {
    const updatedIntervals = program.intervals.map((interval, i) =>
      i === idx ? updated : interval
    );
    onUpdate({ ...program, intervals: updatedIntervals });
  };

  return (
    <Card variant={isActive ? "outlined" : undefined} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>{program.name}</Typography>
        <Button
          variant={isActive ? "contained" : "outlined"}
          color="primary"
          size="small"
          onClick={() => onSelect(program.name)}
          sx={{ mb: 2 }}
        >
          {isActive ? "Activ" : "Selectează"}
        </Button>
        <Divider sx={{ my: 1 }} />
        {program.intervals.map((interval, idx) => (
          <IntervalRow
            key={idx}
            interval={interval}
            index={idx}
            onChange={handleIntervalChange}
          />
        ))}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => onSave(program.name)}
        >
          Salvează intervale
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;