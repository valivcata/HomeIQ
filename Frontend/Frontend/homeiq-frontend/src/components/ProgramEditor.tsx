import React from "react";
import IntervalRow from "./IntervalRow";
import { TemperatureProgram, TemperatureInterval } from "../types/temperature";

interface ProgramEditorProps {
  program: TemperatureProgram;
  onChange: (updated: TemperatureProgram) => void;
}

const ProgramEditor: React.FC<ProgramEditorProps> = ({ program, onChange }) => {
  const handleIntervalChange = (index: number, updatedInterval: TemperatureInterval) => {
    const newIntervals = [...program.intervals];
    newIntervals[index] = updatedInterval;
    onChange({ ...program, intervals: newIntervals });
  };

  return (
    <div>
      {program.intervals.map((interval, i) => (
        <IntervalRow
          key={i}
          interval={interval}
          index={i}
          onChange={handleIntervalChange}
        />
      ))}
    </div>
  );
};

export default ProgramEditor;
