import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { WithEmotion } from "./withEmotion";
import Posts from "../features/posts/Posts";
import { isPost, isIntegration } from "../utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import ImageUpload from "./ImageUploadComponent";
import { IIntegration, Link } from "../features/integrations/integrationTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { sendUpdateIntegrationRequest } from "../features/user/userSlice";
import DoneIcon from "@mui/icons-material/Done";
import {
  getSelectedComponent,
  updateBio,
  updateLinks,
  updateUsername,
} from "../features/integrations/integrationSlice";
import { Post } from "../features/posts/postTypes";

const SettingsPreview = ({
  selectedIntegration,
}: {
  selectedIntegration: IIntegration;
}) => {
  const selectedComponent = useAppSelector(getSelectedComponent);

  return (
    <Grid container direction={"row"}>
      {/* Preview of your page */}
      <Grid direction="column" item lg={5} marginLeft={5}>
        {/* <Typography>Preview: {selectedIntegration.username}</Typography> */}
        <Grid>
          <WithEmotion title="with-material-ui">
            <Posts
              selectedIntegration={selectedIntegration}
              selectedComponent={selectedComponent}
            />
          </WithEmotion>
        </Grid>
      </Grid>

      {/* Settings of your page */}
      <Grid
        container
        style={{ boxShadow: "-10px 10px black", border: "thin solid grey" }}
        lg={5}
        direction={"column"}
        paddingX={5}
      >
        {selectedComponent !== null && isIntegration(selectedComponent) ? (
          <UserSettingInputs sc={selectedIntegration} />
        ) : null}
        {selectedComponent !== null && isPost(selectedComponent) ? (
          <PostSettingInputs sc={selectedComponent} />
        ) : null}
        {selectedComponent === null ? <DefaltSettingInput /> : null}
      </Grid>
    </Grid>
  );
};

const DefaltSettingInput = () => {
  const itemStyle = { marginTop: 5 };
  return (
    <Grid container marginTop={2} direction={"column"}>
      <Grid style={itemStyle} item>
        <Typography variant="h5">All Settings</Typography>
      </Grid>
      <Grid style={itemStyle} item>
        <Card variant="outlined">
          <CardContent>Profile Edit</CardContent>
        </Card>
      </Grid>
      <Grid style={itemStyle} item>
        <Card variant="outlined">
          <CardContent>
            <Typography>Posts: Click on a post to edit</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const PostSettingInputs = ({ sc }: { sc: Post }) => {
  // const [links, setLinks] = useState(sc.links);

  const handleDeleteLink = (index) => {
    // const newLinks = links.filter((_, i) => index !== i);
    // // console.log(newLinks);
    // setLinks(newLinks);
    // Link Delete Button
  };

  const handleLinkAdd = () => {
    // Link Add Handle
  };

  const addLinks = () => {
    // add links
    // const temp = links;
    // temp.push({ website: "xyz", url: "xyz" });
    // console.log(temp);
    // setLinks(temp);
  };

  return (
    // <Grid container direction={"column"} paddingX={5} >
    <Grid marginTop={2}>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h5">Post Settings</Typography>
        <Button variant="contained" color="success">
          Save
        </Button>
      </Grid>
      <List
        subheader={
          <Grid container direction={"row"}>
            <ListSubheader>Links</ListSubheader>
            <ListSubheader>{sc._id}</ListSubheader>
          </Grid>
        }
      >
        {sc.links !== undefined
          ? sc.links.map((l, i) => {
              return (
                <ListItem>
                  <TextField
                    id="link-basic"
                    label={i + 1}
                    value={l.url}
                    variant="outlined"
                  />
                  <ListItemIcon>
                    <IconButton color="error">
                      <CloseIcon onClick={() => handleDeleteLink(i)} />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              );
            })
          : null}
        <ListItem>
          <TextField
            id="link-basic"
            label={"Add new link"}
            value={""}
            variant="outlined"
          />
          <ListItemIcon>
            <IconButton color="success">
              <DoneIcon onClick={() => addLinks()} />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
    </Grid>
    // </Grid>
  );
};

const UserSettingInputs = ({ sc }: { sc: IIntegration }) => {
  const dispatch = useAppDispatch();

  const [links, setLinks] = useState<Link[]>(sc.links);
  const [username, setUsername] = useState<string>(sc.username);
  const [bio, setBio] = useState<string>(sc.bio);
  const [profile, setProfile] = useState<string>(sc.profile);
  const [newLink, setNewLink] = useState<string>("");

  const handleDeleteLink = (index) => {
    const newLinks = sc.links.filter((_, i) => index !== i);
    dispatch(updateLinks(newLinks));
  };

  const handleLinkAdd = () => {
    // Verify link

    // Link Add Handle
    let temp = [];

    Object.assign(temp, sc.links)

    const hostList = new URL(newLink).hostname.split(".")
    temp.push({ name: hostList[hostList.length - 2], url: newLink });

    console.log(temp);

    setNewLink("");
    dispatch(updateLinks(temp));
  };

  const addLinks = () => {
    // add links
    const temp = links;
    temp.push({ name: "xyz", url: newLink });
    setLinks(temp);
  };

  const submitForm = () => {
    dispatch(sendUpdateIntegrationRequest({ username, bio, profile, links }));
  };

  return (
    <Grid marginTop={2} container direction={"column"}>
      <Grid
        item
        container
        direction={"row"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h5">User Settings</Typography>
        <Button variant="contained" color="success" onClick={submitForm}>
          Save
        </Button>
      </Grid>
      <Grid item width={200}>
        <ImageUpload imageUrl={profile} setImageUrl={setProfile} />
      </Grid>
      <FormControl>
        <TextField
          style={{ marginTop: 15 }}
          id="username"
          label="username"
          fullWidth={true}
          value={sc.username}
          variant="outlined"
          onChange={(e) => dispatch(updateUsername(e.target.value))}
        />
        <TextField
          style={{ marginTop: 15 }}
          id="bio"
          label="bio"
          fullWidth={true}
          value={sc.bio}
          variant="outlined"
          onChange={(e) => dispatch(updateBio(e.target.value))}
        />
        <List
          subheader={
            <Grid container direction={"row"}>
              <ListSubheader>Bio Links</ListSubheader>
            </Grid>
          }
        >
          {sc.links.map((l, i) => {
            return (
              <ListItem>
                <TextField
                  id="link-basic"
                  label={i + 1}
                  fullWidth={true}
                  value={l.url}
                  variant="outlined"
                />
                <ListItemIcon>
                  <IconButton color="error">
                    <CloseIcon onClick={() => handleDeleteLink(i)} />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            );
          })}
          <ListItem>
            <TextField
              id="link-basic"
              label={"Add new link"}
              fullWidth={true}
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              color="success"
              variant="outlined"
              placeholder="Enter a new link..."
            />
            <ListItemIcon>
              <IconButton color="success">
                <DoneIcon onClick={() => handleLinkAdd()} />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </FormControl>
    </Grid>
  );
};

export default SettingsPreview;
