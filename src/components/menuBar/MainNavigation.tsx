import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import AuthContext from "../../store/auth-context";
import { domain } from "../../utils/apiCallsHandler";
import { getAuthToken } from "../../utils/auth";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../../utils/constants";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainNavigation: React.FC<{
  open: boolean;
  handleDrawerOpen: () => void;
}> = ({ open, handleDrawerOpen }) => {
  const theme = useTheme();

  const { token, logout, getDetailsForUser, loggedUser } =
    useContext(AuthContext);

  const tokenLS = getAuthToken();

  const loginToken = token || tokenLS;

  useEffect(() => {
    if (!loggedUser && loginToken) {
      (async () => {
        await getDetailsForUser?.();
      })();
    }
  }, [loginToken, getDetailsForUser, loggedUser]);

  return (
    <Box sx={{ display: "flex", height: "10vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1000,
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            //onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            SecondLife
          </Typography>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/sell-item"
          >
            Sell
            <AddCircleOutlineRoundedIcon
              sx={{ marginLeft: "7px", marginTop: "3px" }}
            />
          </IconButton>
          {!loginToken && (
            <IconButton
              size="medium"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/sign-up"
            >
              Sign up
            </IconButton>
          )}
          {!loginToken && (
            <IconButton
              size="medium"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/login"
            >
              Login
            </IconButton>
          )}
          {loginToken && (
            <IconButton
              size="medium"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={logout}
            >
              Logout
            </IconButton>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/user-profile"
          >
            {loggedUser && !loggedUser.picture && (
              <Avatar
                sx={{
                  width: 55,
                  height: 55,
                  border: "2px solid white",
                  fontSize: "20px",
                }}
                alt="Remy Sharp"
              >
                {loggedUser.firstName[0] + loggedUser.lastName[0]}
              </Avatar>
            )}
            {loggedUser && loggedUser.picture && (
              <Avatar
                sx={{
                  width: 55,
                  height: 55,
                  border: "2px solid white",
                }}
                alt="Remy Sharp"
                // TO BE COMPLETED
                src={`${domain}/images/users/${loggedUser.picture}`}
              />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation;
