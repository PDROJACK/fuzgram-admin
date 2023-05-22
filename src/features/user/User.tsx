import { Grid, IconButton, styled, Typography } from "@mui/material";
import { Share } from "@material-ui/icons";
// import ShareLinkSlideUp from "../../components/ShareLink";
import { useState } from "react";
import { selectUser } from "./userSlice";
import { useAppSelector } from "../../app/hooks";
import { isIntegration } from "../../utils/utils";
import { IUser } from "./userTypes";
import { IIntegration, Link } from "../integrations/integrationTypes";

const ProfileImg = styled("img")({
  margin: "auto",
  display: "block",
  borderRadius: "50%",
  width: 120,
  height: 120,
  border: "thin solid black"
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  borderRadius: "50%"
});

const LinkComponent = ({ name, url }: Link) => {
  return (
    <Grid
      onClick={() => console.log("hello")}
      style={{
        border: "2 solid black",
      }}
    >
      <Img src="https://via.placeholder.com/35" />
      {/* <Typography>{website}</Typography> */}
    </Grid>
  );
};

const User = ({selectedIntegration, selectedComponent}: {selectedIntegration?: IIntegration, selectedComponent?: IIntegration}) => {

  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);

  console.log(selectedComponent)

  return (
    <Grid
      justifyContent="center"
      style={{
        marginTop: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 5,
        borderColor : selectedComponent !== undefined && selectedComponent !== null && selectedComponent.profile !== undefined ? "red" : "white", 
      }}
      container
      direction={"column"}
    >

      <Grid
        justifyContent="center"
        style={{
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 15,
        }}
        item
        container
        direction="row"
      >
        {/* Profile photo */}
        <Grid marginBottom={2} item>
          <ProfileImg src={selectedIntegration.profile} />
        </Grid>

        {/* User info */}
        <Grid
          container
          direction="column"
          style={{
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
          lg={6}
        >
          <Grid item>
            <Typography variant="h5" component="h5">
              {selectedIntegration.username}
            </Typography>
          </Grid>

          <Grid item marginTop={1} marginBottom={1}>
            {selectedIntegration.bio}
          </Grid>

          <Grid container justifyItems="flex-start" direction="row">
            {selectedIntegration.links.map((l,i) => {
              return (
                <Grid key={i} item marginRight={2}>
                  <LinkComponent name={l.name} url={l.url} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default User;
