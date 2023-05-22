import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";

import React from "react";
import SecButton from "./buttons/SecButton";
import { selectIntegration } from "../features/integrations/integrationSlice";
import { useAppSelector } from "../app/hooks";
import { auth } from "../app/firebasConfig";
import Logo from "../assets/logo.png";
import PrimaryButton from "./buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { Person, ViewDay, ExitToApp, Link, Settings } from "@material-ui/icons";



const drawerWidth = 240;

const Header = () => {
  const selectedIntegration = useAppSelector(selectIntegration);
  const navigate = useNavigate();


  return (
    <AppBar
      position="fixed"
      sx={{
        // width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 5px 10px grey"
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

          {/* open preview of app */}
          {selectedIntegration !== null ? (
            <Grid item>
              <Box sx={{ marginX: 1 }}>
                <SecButton
                  text={`http://localhost:3001/${selectedIntegration.username}`}
                  startIcon={<Link />}
                  onClick={() => {
                    window.location.href = `http://localhost:3001/${selectedIntegration.username}`;
                  }}
                />
              </Box>
            </Grid>
          ) : null}
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
              startIcon={<Settings />}
              onClick={() => {
                navigate("/user/settings");
              }}
            />
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
