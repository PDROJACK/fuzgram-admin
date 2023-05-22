import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { selectUser } from "../features/user/userSlice";
import { useAppSelector } from "../app/hooks";
import InstagramLogin from "./InstagramAuth";
import InstagramIcon from "@material-ui/icons/Instagram";
import { IIntegration } from "../features/integrations/integrationTypes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

function SideBar({
  selectedIntegration,
}: {
  selectedIntegration: IIntegration;
}) {

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {user.integrations.map((i, index) => (
          <Link
            style={{color: "black"}}
            to={"/user/" + i.username}
            onClick={(e) => {
              navigate("/user/" + i.username);
            }}
          >
            <ListItem key={i.username} disablePadding>
              {i.username === selectedIntegration.username ? (
                <ListItemButton selected={true}>
                  <ListItemIcon>
                    <InstagramIcon />
                  </ListItemIcon>
                  <ListItemText primary={i.username} />
                </ListItemButton>
              ) : (
                <ListItemButton>
                  <ListItemIcon>
                    <InstagramIcon />
                  </ListItemIcon>
                  <ListItemText primary={i.username} />
                </ListItemButton>
              )}
            </ListItem>
          </Link>
        ))}
        <Divider />
        <ListItem>
          <InstagramLogin />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}

export default SideBar;
