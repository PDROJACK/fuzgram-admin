import { Person, ViewDay, ExitToApp } from "@material-ui/icons";
import { Divider, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Logo from "../assets/logo.png";
import SideBar from "../components/SideBar";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecButton from "../components/buttons/SecButton";
import { auth } from "../app/firebasConfig";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import SettingsPreview from "../components/SettingsPreview";
import { useNavigate } from "react-router-dom";
import { selectIntegration } from "../features/integrations/integrationSlice";

const drawerWidth = 240;

export default function HomePageEdit() {
  const [page, setPage] = useState("posts");
  const navigator = useNavigate();

  const user = useAppSelector(selectUser);
  const selectedIntegration = useAppSelector(selectIntegration)

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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grid container direction={"row"}>
            {/* Logo */}
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

          <Grid container direction={"row-reverse"}>
            {/* Logout Button */}
            <Box sx={{ marginX: 1 }}>
              <PrimaryButton
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
                text="Profile"
                startIcon={<Person />}
                onClick={() => {
                  console.log("hello");
                }}
              />
            </Box>

            {/* open preview of app */}
            <Box sx={{ marginX: 1 }}>
              <SecButton
                text="Preview"
                startIcon={<ViewDay />}
                onClick={() => {
                  window.location.href = "https://www.google.com";
                }}
              />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* left side controls */}
      <SideBar
        selectedIntegration={selectedIntegration}
        // setSelectedIntegration={setSelectedIntegration}
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {
          user.integrations.length > 0
          ?
           <SettingsPreview selectedIntegration={selectedIntegration}/>
          :
            // #TODO: Render a component with Add integration button and some instructions
            null
          }
      </Box>
    </Box>
  );
}
