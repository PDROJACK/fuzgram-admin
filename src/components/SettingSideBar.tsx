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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function SettingSideBar(props) {
  const { generalSetting, setGeneralSetting } = props;
  const settingList = ["Accounts", "Payments"];
  const settingIcons: any = [<ManageAccountsIcon />, <PaymentIcon />];

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
        {settingList.map((x, i) => {
          if (i === generalSetting) {
            return (
              <ListItem disablePadding>
                <ListItemButton selected={true}>
                  <ListItemIcon>{settingIcons[i]}</ListItemIcon>
                  <ListItemText>{x}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          } else {
            return (
              <ListItem
                onClick={() => {
                  setGeneralSetting(i);
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{settingIcons[i]}</ListItemIcon>
                  <ListItemText>{x}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
      <Divider />
    </Drawer>
  );
}

export default SettingSideBar;
