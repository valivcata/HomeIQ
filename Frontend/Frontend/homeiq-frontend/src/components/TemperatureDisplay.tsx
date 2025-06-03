import { Typography, Stack, CircularProgress } from "@mui/material";
import { SmartHomePayload } from "../types";

interface Props {
  loading: boolean;
  error: string | null;
  payload: SmartHomePayload | null;
}

export default function TemperatureDisplay({ loading, error, payload }: Props) {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Typography>
        Camera 1: {payload?.camera1.temperature} °C, Umiditate:{" "}
        {payload?.camera1.humidity}%
      </Typography>
      <Typography>
        Camera 2: {payload?.camera2.temperature} °C, Umiditate:{" "}
        {payload?.camera2.humidity}%
      </Typography>
      <Typography>Lock State: {payload?.lockState}</Typography>
      <Typography>Ultima actualizare: {payload?.datetime}</Typography>
    </Stack>
  );
}
