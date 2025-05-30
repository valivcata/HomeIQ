import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    nume: "",
    prenume: "",
    cnp: "",
    codBluetooth: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5033/api/users/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Utilizator creat cu succes.");
      setForm({
        username: "",
        email: "",
        nume: "",
        prenume: "",
        cnp: "",
        codBluetooth: "",
        password: "",
      });
    } catch (err: any) {
      setError(err.response?.data || "Eroare la creare.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Creare utilizator nou
      </Typography>
      <Stack spacing={2}>
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
        <TextField label="Nume" name="nume" value={form.nume} onChange={handleChange} />
        <TextField label="Prenume" name="prenume" value={form.prenume} onChange={handleChange} />
        <TextField label="CNP" name="cnp" value={form.cnp} onChange={handleChange} />
        <TextField label="Cod Bluetooth" name="codBluetooth" value={form.codBluetooth} onChange={handleChange} />
        <TextField label="Parolă" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit}>
          Creează
        </Button>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Container>
  );
}