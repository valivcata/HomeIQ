import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Button
      onClick={logout}
      variant="outlined"
      color="error"
      style={{ minWidth: "180px" }}
    >
      Logout
    </Button>
  );
}
