import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Switch, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectIntegrations,
  selectUser,
  toggleIntegration,
} from "../features/user/userSlice";
import { useState } from "react";

function Settings({ selectedIntegration, setSelectedIntegration }) {
  const integration = useAppSelector(selectIntegrations);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Delete the integration and reload page
    setOpen(false);
  };

  return (
    <Grid container direction={"column"} justifyContent={"space-between"}>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-evenly"}
        marginBottom={2}
      >
        <Typography variant="h4">Integration Settings</Typography>
        <Button variant="contained">Save</Button>
      </Grid>

      <Divider />

      <Grid>
        <Typography fontWeight={900}>Account username:</Typography>
        <Typography>{integration[selectedIntegration].username}</Typography>
      </Grid>

      <Grid>
        <Typography fontWeight={900}>Integration type:</Typography>
        <Typography>{integration[selectedIntegration].username}</Typography>
      </Grid>

      <Grid>
        <Typography fontWeight={900}>Integration since:</Typography>
        <Typography>
          {/* {integration[selectedIntegration].toISOString()} */}
        </Typography>
      </Grid>

      <Grid>
        <Typography fontWeight={900}>Account status:</Typography>
        <Switch
          checked={integration[selectedIntegration].enabled}
          onChange={() => dispatch(toggleIntegration(selectedIntegration))}
          defaultChecked
        />
      </Grid>

      <Grid sm={2} md={2} lg={2}>
        <Typography fontWeight={900}>Delete account: </Typography>
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete integration"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this social media integration ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="success">No</Button>
            <Button onClick={handleClose} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default Settings;
