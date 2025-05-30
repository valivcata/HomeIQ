import { Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h2" gutterBottom color="blue">
         HomeIQ
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Controlează luminile, temperatura și mai multe dintr-un singur loc.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={() => navigate("/login")}>
          Conectare
        </Button>
      </Stack>
    </Container>
  );
}