export type ProgramKey = "weekday" | "weekend" | "concediu";

export interface TemperatureInterval {
  start: string; // "06:30"
  end: string;   // "09:30"
  temperature: number;
}

export interface TemperatureProgram {
  name: ProgramKey;
  intervals: TemperatureInterval[];
}

export type ProgramsMap = Record<ProgramKey, TemperatureProgram>;