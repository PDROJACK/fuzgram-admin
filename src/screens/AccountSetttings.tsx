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
import { auth } from "../app/firebasConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import SettingsPreview from "../components/SettingsPreview";
import { useNavigate, useParams } from "react-router-dom";
import { selectIntegration } from "../features/integrations/integrationSlice";
import SettingSideBar from "../components/SettingSideBar";
import GeneralSettings from "../components/GeneralSettings";

const drawerWidth = 240;

export default function AccountSettings() {
  const user = useAppSelector(selectUser);
  const { integration } = useParams();

  const selectedIntegration = useAppSelector(selectIntegration);
  const navigate = useNavigate();

  const [generalSetting, setGeneralSetting] = useState<number>(1);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "black",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* List of Controls */}
        <Toolbar>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            {/* Logo */}
            <Grid item container direction={"row"} width={150}>
              <img
                src={Logo}
                width={24}
                height={24}
                style={{ margin: 4 }}
                alt="logo"
              />

              {/* Logo Font */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                fuzgram
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction={"row-reverse"}>
            {/* Logout Button */}
            <Box sx={{ marginX: 1 }}>
              <SecButton
                text="Logout"
                startIcon={<ExitToApp />}
                onClick={() => {
                  auth.signOut();
                }}
              />
            </Box>

            {/* open profile page */}
            <Box sx={{ marginX: 1 }}>
              <PrimaryButton
                text="Settings"
                startIcon={<Person />}
                onClick={() => {
                  navigate("/user/settings");
                }}
              />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* left side controls */}
      <SettingSideBar generalSetting={generalSetting} setGeneralSetting={setGeneralSetting} />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <GeneralSettings generalSetting={generalSetting} setGeneralSetting={setGeneralSetting} />
      </Box>

    </Box>
  );
}
