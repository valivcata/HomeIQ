import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Switch,
} from '@mui/material';

interface Interval {
  start: string;
  temperature: number;
}

interface Program {
  name: string;
  intervals: Interval[];
}

const programNames = ['weekday', 'weekend', 'concediu'];

const TemperaturePrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [activeProgram, setActiveProgram] = useState<string>('');

  useEffect(() => {
    fetchPrograms();
    fetchActiveProgram();
  }, []);

  const fetchPrograms = async () => {
    try {
const res = await axios.get<Program[]>('/api/temperature-programs');
      setPrograms(res.data);
    } catch {
      const fallback = programNames.map(name => ({
        name,
        intervals: Array(6).fill({ start: '', temperature: 20 }),
      }));
      setPrograms(fallback);
    }
  };

  const fetchActiveProgram = async () => {
    try {
  const res = await axios.get<Program>('/api/temperature-programs/active');

      setActiveProgram(res.data.name);
    } catch {
      setActiveProgram('');
    }
  };

  const updateInterval = (progIndex: number, intervalIndex: number, field: keyof Interval, value: string | number) => {
    const updated = [...programs];
    updated[progIndex].intervals[intervalIndex] = {
      ...updated[progIndex].intervals[intervalIndex],
      [field]: field === 'temperature' ? Number(value) : value,
    };
    setPrograms(updated);
  };

  const saveProgram = async (program: Program) => {
    try {
      await axios.post('/api/temperature-programs', program);
      alert(`Salvat: ${program.name}`);
    } catch {
      alert('Eroare la salvare.');
    }
  };

  const selectProgram = async (name: string) => {
    try {
      await axios.post(`/api/temperature-programs/select/${name}`);
      setActiveProgram(name);
    } catch {
      alert('Eroare la selectare program');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" mb={3}>Programare Temperatură</Typography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        {programs.map((prog, i) => (
          <Card key={prog.name} sx={{ minWidth: 300, flex: 1 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{prog.name.toUpperCase()}</Typography>
                <Switch
                  checked={activeProgram === prog.name}
                  onChange={() => selectProgram(prog.name)}
                />
              </Box>
              {prog.intervals.map((intv, j) => (
                <Box key={j} display="flex" alignItems="center" gap={1} my={1}>
                  <TextField
                    type="time"
                    value={intv.start}
                    onChange={(e) => updateInterval(i, j, 'start', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label="°C"
                    value={intv.temperature}
                    onChange={(e) => updateInterval(i, j, 'temperature', e.target.value)}
                    inputProps={{ step: 0.5, min: 5, max: 35 }}
                    fullWidth
                  />
                </Box>
              ))}
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => saveProgram(prog)}>
                Salvează
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TemperaturePrograms;
