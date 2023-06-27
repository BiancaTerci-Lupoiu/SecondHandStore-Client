import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MapIcon from "@mui/icons-material/Map";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SellIcon from "@mui/icons-material/Sell";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";
import { getAuthToken } from "../../utils/auth";
import { drawerWidth } from "../../utils/constants";
import { DrawerHeader } from "./DrawerHeader";

const MenuDrawer: React.FC<{
  open: boolean;
  handleDrawerClose: () => void;
}> = ({ handleDrawerClose, open }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { token, logout } = useContext(AuthContext);

  const tokenLS = getAuthToken();
  const isUserLogged = tokenLS || token;

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
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      {/* <Divider /> */}
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"About us"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/main">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary={"Shop"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/sell-item">
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary={"Sell items"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/map">
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={"Discover"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {isUserLogged && (
          <ListItem disablePadding>
            <ListItemButton href="/user-profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
        )}
        {isUserLogged && (
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        )}
        {!isUserLogged && (
          <ListItem disablePadding>
            <ListItemButton href="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        )}
        {!isUserLogged && (
          <ListItem disablePadding>
            <ListItemButton href="/sign-up">
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary={"Sign up"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
