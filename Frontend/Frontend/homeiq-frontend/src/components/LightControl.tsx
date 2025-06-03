import React from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

interface LightControlProps {
  lightStatus: "on" | "off" | "loading" | "error";
  onToggle: () => void;
}

export default function LightControl({ lightStatus, onToggle }: LightControlProps) {
  const getButtonColor = () => {
    switch (lightStatus) {
      case "on": return "#4caf50";
      case "off": return "#f44336";
      case "loading":
      case "error":
      default: return "#9e9e9e";
    }
  };

  const getBulbColor = () => {
    if (lightStatus === "on") return "#ffeb3b";
    if (lightStatus === "loading") return "#bdbdbd";
    return "#9e9e9e";
  };

  const renderLabel = () => {
    if (lightStatus === "loading") return "Se schimbă...";
    if (lightStatus === "on") return "Stinge becul";
    if (lightStatus === "off") return "Aprinde becul";
    return "Eroare la ESP";
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <LightbulbIcon
        sx={{ fontSize: 80, color: getBulbColor(), transition: "color 0.3s" }}
      />
      <Button
        onClick={onToggle}
        disabled={lightStatus === "loading"}
        style={{
          backgroundColor: getButtonColor(),
          color: "white",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          minWidth: "180px",
        }}
      >
        {lightStatus === "loading" ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          renderLabel()
        )}
      </Button>
    </Stack>
  );
}