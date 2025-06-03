// src/components/TemperatureControl.tsx
import React from "react";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";

interface TemperatureControlProps {
  temperature: number;
  tempStatus: "idle" | "loading" | "success" | "error";
  setTemperature: (temp: number) => void;
  onSetTemperature: () => void;
}

export default function TemperatureControl({
  temperature,
  tempStatus,
  setTemperature,
  onSetTemperature,
}: TemperatureControlProps) {
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Typography variant="h6">Setează temperatura</Typography>
      <TextField
        label="Temperatura (°C)"
        type="number"
        inputProps={{ min: 5, max: 35 }}
        value={temperature}
        onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
      />
      <Button
        onClick={onSetTemperature}
        disabled={tempStatus === "loading"}
        variant="contained"
        style={{
          backgroundColor:
            tempStatus === "loading" ? "#9e9e9e" : "#1976d2",
          color: "white",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          minWidth: "180px",
        }}
      >
        {tempStatus === "loading" ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          `Setează ${temperature}°C`
        )}
      </Button>
      {tempStatus === "error" && (
        <Typography color="error">
          A apărut o eroare la setarea temperaturii
        </Typography>
      )}
      {tempStatus === "success" && (
        <Typography color="success.main">
          Temperatura a fost setată cu succes
        </Typography>
      )}
    </Stack>
  );
}