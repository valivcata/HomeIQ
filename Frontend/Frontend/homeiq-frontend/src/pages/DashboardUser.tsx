import React, { useState, useEffect } from "react";
import {
  TemperatureProgram,
  ProgramsMap,
  ProgramKey,
} from "../types/temperature";
import ProgramCard from "../components/ProgramCard";
import api from "../services/api";
import { Button, Typography, CircularProgress, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultPrograms: ProgramsMap = {
  weekday: {
    name: "weekday",
    intervals: [
      { start: "06:30", end: "09:30", temperature: 19 },
      { start: "09:30", end: "12:00", temperature: 16 },
      { start: "12:00", end: "15:00", temperature: 18 },
      { start: "15:00", end: "18:00", temperature: 16 },
      { start: "18:00", end: "20:00", temperature: 19.5 },
      { start: "20:00", end: "22:00", temperature: 18 },
    ],
  },
  weekend: {
    name: "weekend",
    intervals: [
      { start: "06:30", end: "09:30", temperature: 21 },
      { start: "09:30", end: "12:00", temperature: 19 },
      { start: "12:00", end: "15:00", temperature: 20 },
      { start: "15:00", end: "18:00", temperature: 19 },
      { start: "18:00", end: "20:00", temperature: 21 },
      { start: "20:00", end: "22:00", temperature: 20 },
    ],
  },
  concediu: {
    name: "concediu",
    intervals: [
      { start: "07:30", end: "10:30", temperature: 20 },
      { start: "10:30", end: "13:00", temperature: 18 },
      { start: "13:00", end: "16:00", temperature: 19 },
      { start: "16:00", end: "18:00", temperature: 18 },
      { start: "18:00", end: "20:00", temperature: 20 },
      { start: "20:00", end: "22:00", temperature: 19 },
    ],
  },
};

const DashboardUser: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramsMap>(defaultPrograms);
  const [active, setActive] = useState<ProgramKey>("weekday");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        // GET toate programele
        const allRes = await api.get("/temperatureprogram/all", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        // Dacă backendul returnează un obiect cu chei (weekday, weekend, concediu)
       if (allRes.data && typeof allRes.data === "object" && !Array.isArray(allRes.data)) {
  setPrograms(allRes.data as ProgramsMap);
        } else if (Array.isArray(allRes.data)) {
          // fallback dacă backendul returnează array
          const fetchedMap: Partial<ProgramsMap> = {};
          allRes.data.forEach((prog: TemperatureProgram) => {
            fetchedMap[prog.name as ProgramKey] = prog;
          });
          setPrograms((prev) => ({ ...prev, ...fetchedMap }));
        }

        // GET programul activ
        const actRes = await api.get("/temperatureprogram/active", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
       const activeName = (actRes.data as { Name: string }).Name;
setActive(activeName as ProgramKey);
      } catch (err) {
        setError("Eroare la încărcarea datelor de la server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleSelectProgram = async (progName: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post(
        "/temperatureprogram/select",
        { programName: progName },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setActive(progName as ProgramKey);
    } catch (err) {
      setError("Nu s-a putut schimba programul activ.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgram = (updated: TemperatureProgram) => {
    setPrograms((prev) => ({
      ...prev,
      [updated.name]: updated,
    }));
  };

  const handleSaveProgram = async (progName: string) => {
    try {
      setLoading(true);
      setError(null);
      const progToSave = programs[progName as ProgramKey];
      // Conversie intervale la backend (TimeSpan) dacă e nevoie
      const intervals = progToSave.intervals.map(i => ({
        start: i.start,
        end: i.end,
        temperature: i.temperature,
      }));
      await api.put(`/temperatureprogram/${progName}`, intervals, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert(`Programul '${progName}' a fost salvat cu succes.`);
    } catch (err) {
      setError("Eroare la salvarea programului.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard User
      </Typography>

      <Typography variant="h5" gutterBottom>
        Programe Temperatură
      </Typography>

      {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          mb: 4,
        }}
      >
        {(["weekday", "weekend", "concediu"] as ProgramKey[]).map((key) => (
          <ProgramCard
            key={key}
            program={programs[key]}
            isActive={active === key}
            onSelect={handleSelectProgram}
            onUpdate={handleUpdateProgram}
            onSave={handleSaveProgram}
          />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Button variant="outlined" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default DashboardUser;