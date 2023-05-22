import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
// import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { Button, CircularProgress, IconButton } from "@mui/material"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CancelIcon from "@material-ui/icons/Cancel";
import { app } from "../app/firebasConfig";
import { Grid } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIntegration, updateProfile } from "../features/integrations/integrationSlice";

const useStyles = makeStyles()((theme) => ({

  input: {
    display: "none",
    width: 100,
    height: 100,
  },
  cancelIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 5
  },
  circle: {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "#f0f0f0",
  },
}));

function ImageUpload({ imageUrl, setImageUrl }:{ imageUrl: string, setImageUrl: Function }) {
  const {classes} = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const selectedIntegration = useAppSelector(selectIntegration);
  // const [imageUrl, setImageUrl] = useState(profile);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      dispatch(updateProfile(imageUrl));
      //   onChange(imageUrl);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setImageUrl(null);
    // onChange(null);
  };

  const uploadImage = async (file) => {
    const storageRef = getStorage(app);
    const fileRef = ref(storageRef, file.name);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  };

  return (
    <Grid direction={"row"}>
      {selectedIntegration.profile ? (
        <Grid marginBottom={1}>
          <img className={classes.circle} src={selectedIntegration.profile}/>
          <IconButton className={classes.cancelIcon} onClick={handleCancel}>
            <CancelIcon />
          </IconButton>
        </Grid>
      ) : null}
      <input
        className={classes.input}
        accept="image/*"
        id="image-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<AddPhotoAlternateIcon />}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Change Profile"}
        </Button>
       </label>
    </Grid>
  );
}

export default ImageUpload;
