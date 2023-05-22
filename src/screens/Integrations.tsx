import { Person, ViewDay, ExitToApp, Link } from "@material-ui/icons";
import { Divider, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import SideBar from "../components/SideBar";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecButton from "../components/buttons/SecButton";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import SettingsPreview from "../components/SettingsPreview";
import { useNavigate, useParams } from "react-router-dom";
import { selectIntegration } from "../features/integrations/integrationSlice";
import Header from "../components/Header";

const drawerWidth = 240;

export default function Integrations() {
  const user = useAppSelector(selectUser);
  const { integration } = useParams();
  // const [selectedIntegration, setSelectedIntegration] = useState<IIntegration>(null);

  const selectedIntegration = useAppSelector(selectIntegration);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header />

      {/* left side controls */}
      {selectedIntegration === null ? null : (
        <SideBar selectedIntegration={selectedIntegration} />
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {selectedIntegration !== null ? (
          <SettingsPreview selectedIntegration={selectedIntegration} />
        ) : // #TODO: Render a component with Add integration button and some instructions
        null}
      </Box>
    </Box>
  );
}
