import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// Definim tipuri pentru datele primite
interface CameraData {
  temperature: number;
  humidity: number;
  ledState?: boolean;
}

interface SmartHomePayload {
  datetime: string;
  camera1: CameraData;
  camera2: CameraData;
  lockState: string;
}

export default function DashboardUser() {
  // Starea becului
  const [lightStatus, setLightStatus] =
    useState<"on" | "off" | "loading" | "error">("off");

  // Starea temperaturii și statusul cererii pentru setarea temperaturii
  const [temperature, setTemperature] = useState<number>(22);
  const [tempStatus, setTempStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  // Starea pentru datele primite de la backend
  const [payload, setPayload] = useState<SmartHomePayload | null>(null);
  const [loadingPayload, setLoadingPayload] = useState<boolean>(false);
  const [errorPayload, setErrorPayload] = useState<string | null>(null);

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  // Fetch periodic al datelor de la backend
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPayload(true);
      setErrorPayload(null);
      try {
        const response = await api.get<SmartHomePayload>("/CurrentTemperature", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        setPayload(response.data);

        // Actualizează starea becului dacă există ledState
        if (response.data.camera1.ledState !== undefined) {
          setLightStatus(response.data.camera1.ledState ? "on" : "off");
        }

        setLoadingPayload(false);
      } catch (error) {
        console.error("Eroare la fetch temperaturi:", error);
        setErrorPayload("Nu am putut încărca temperaturile.");
        setLoadingPayload(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // la fiecare 10 secunde

    return () => clearInterval(interval);
  }, []);

  // Funcțiile toggleLight, setTemperatureHandler și logout rămân neschimbate,
  // le poți copia din codul tău original fără modificări

  // (le reintroduc aici doar pentru claritate)

  const toggleLight = async () => {
    setLightStatus("loading");
    try {
      const endpoint = lightStatus === "on" ? "off" : "on";
      await api.post(
        `/light/${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setLightStatus(endpoint === "on" ? "on" : "off");

      const eventType = endpoint === "on" ? "LightOn" : "LightOff";
      await api.post(
        `/eventlog`,
        { eventType, details: "camera1" },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    } catch (error) {
      console.error("Eroare la backend/ESP sau EventLog (light):", error);
      setLightStatus("error");
    }
  };

  const setTemperatureHandler = async () => {
    setTempStatus("loading");
    try {
      await api.post(
        `/temperature/set`,
        { temperature },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setTempStatus("success");

      await api.post(
        `/eventlog`,
        {
          eventType: "SetTemperature",
          details: `Temperatura setată la ${temperature}°C`,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
    } catch (error) {
      console.error("Eroare la setTemperature sau EventLog:", error);
      setTempStatus("error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Stilizarea butoanelor, iconițelor etc. rămâne la fel

  const getButtonColor = () => {
    switch (lightStatus) {
      case "on":
        return "#4caf50";
      case "off":
        return "#f44336";
      case "loading":
      case "error":
        return "#9e9e9e";
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
    if (lightStatus === "on") return "#ffeb3b";
    if (lightStatus === "loading") return "#bdbdbd";
    return "#9e9e9e";
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard User
      </Typography>

      <Stack direction="column" spacing={4} alignItems="center">
        {/* Afișare temperaturi și umiditate din camere */}
        <Stack direction="column" spacing={1} alignItems="center">
          <Typography variant="h6">Temperaturi și umiditate curente</Typography>
          {loadingPayload && <CircularProgress />}
          {errorPayload && (
            <Typography color="error">{errorPayload}</Typography>
          )}
          {!loadingPayload && payload && (
            <>
              <Typography>
                Camera 1: {payload.camera1.temperature} °C, Umiditate:{" "}
                {payload.camera1.humidity}%
              </Typography>
              <Typography>
                Camera 2: {payload.camera2.temperature} °C, Umiditate:{" "}
                {payload.camera2.humidity}%
              </Typography>
              <Typography>Lock State: {payload.lockState}</Typography>
              <Typography>Ultima actualizare: {payload.datetime}</Typography>
            </>
          )}
        </Stack>

        {/* Secțiune Lumină */}
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

        {/* Secțiune Temperatură */}
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
            onClick={setTemperatureHandler}
            disabled={tempStatus === "loading"}
            variant="contained"
            style={{
              backgroundColor:
                tempStatus === "loading"
                  ? "#9e9e9e"
                  : "#1976d2" /* albastru default MUI */,
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

        {/* Buton Logout */}
        <Button
          onClick={logout}
          variant="outlined"
          color="error"
          style={{ minWidth: "180px" }}
        >
          Logout
        </Button>
      </Stack>
    </div>
  );
}
