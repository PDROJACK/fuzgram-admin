import { Button, Grid, Typography } from "@mui/material";
import React from "react";

function ProfileSettings() {
  return (
    <Grid container>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-evenly"}
        marginBottom={2}
      >
        <Typography variant="h4">Fuzgram Settings</Typography>
        <Button variant="contained">Save</Button>
      </Grid>
    

    </Grid>
  );
}

export default ProfileSettings;
