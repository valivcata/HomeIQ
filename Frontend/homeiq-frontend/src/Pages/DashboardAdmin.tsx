import { useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import axios from "axios";

export default function DashboardAdmin() {
  const [lightStatus, setLightStatus] = useState<"on" | "off" | "loading" | "error">("off");

  const toggleLight = async () => {
    setLightStatus("loading");
    try {
      const response = await axios.post("http://localhost:5033/api/device/toggle-light");
      const newStatus = response.data.status === "on" ? "on" : "off";
      setLightStatus(newStatus);
    } catch (error) {
      setLightStatus("error");
      console.error("Eroare la backend/ESP:", error);
    }
  };

  const getButtonColor = () => {
    switch (lightStatus) {
      case "on":
        return "#4caf50"; // verde
      case "off":
        return "#f44336"; // roșu
      case "error":
        return "#9e9e9e"; // gri
      case "loading":
        return "#9e9e9e"; // gri
      default:
        return "#9e9e9e";
    }
  };

  const renderLabel = () => {
    if (lightStatus === "loading") return "Se schimbă...";
    if (lightStatus === "on") return "Stinge becul";
    if (lightStatus === "off") return "Aprinde becul";
    return "Eroare la ESP";
  };

  const getBulbColor = () => {
    if (lightStatus === "on") return "#ffeb3b"; // galben aprins
    if (lightStatus === "loading") return "#bdbdbd"; // gri
    return "#9e9e9e"; // gri stins
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Admin
      </Typography>

      <Stack direction="column" spacing={2} alignItems="center">
        <LightbulbIcon
          sx={{
            fontSize: 80,
            color: getBulbColor(),
            transition: "color 0.3s",
          }}
        />

        <Button
          onClick={toggleLight}
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
    </div>
  );
}
