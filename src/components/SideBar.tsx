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
import { selectUser } from "../features/userinfo/userSlice";
import { useAppSelector } from "../app/hooks";
import InstagramLogin from "./InstagramAuth";
import InstagramIcon from "@material-ui/icons/Instagram";

const drawerWidth = 240;

function SideBar({ selectedIntegration, setSelectedIntegration }) {
  const user = useAppSelector(selectUser);

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
          <ListItem
            key={i.username}
            onClick={() => setSelectedIntegration(index)}
            disablePadding
          >
            {index === selectedIntegration ? (
              <ListItemButton selected={true}>
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary={i.social} />
              </ListItemButton>
            ) : (
              <ListItemButton>
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary={i.social} />
              </ListItemButton>
            )}
          </ListItem>
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
