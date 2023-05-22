import { Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { selectUser } from '../features/user/userSlice';
import { useAppSelector } from '../app/hooks';

function GeneralSettings(props) {

  const { generalSetting, setGeneralSetting } = props;

  return (
    <>
      {
        generalSetting === 0 ? <AccountSetting /> : null
      }
      {
        generalSetting === 1 ? <Typography>1</Typography> : null
      }
    </>
  )
}

const AccountSetting = () => {
  const user = useAppSelector(selectUser);
  return (
    <Grid>
      <Typography variant='h4'>Account Settings</Typography>
      <Divider/>
      <Typography>Personal Information</Typography>
      <Typography>{user.username}</Typography>
      <Typography>{user.email}</Typography>
      <Button>Change Password</Button>
      <Typography color="error">Delete Account</Typography>
      <Typography color="error">Deleting Account will delete all of your data on Fuzgram</Typography>
      <Button>Delete</Button>
    </Grid>
  )
}


export default GeneralSettings