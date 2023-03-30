import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "../css/Root.module.css";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuDrawer from "../components/MenuDrawer";
import { DrawerHeader } from "../components/DrawerHeader";
import { Main } from "../components/Main";

const RootLayout: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MainNavigation open={open} handleDrawerOpen={handleDrawerOpen} />
      <MenuDrawer handleDrawerClose={handleDrawerClose} open={open} />
      <Main open={open}>
        <DrawerHeader />
        <div className={classes.scrollable}>
          <Outlet />
        </div>
      </Main>
    </Box>
  );
};

export default RootLayout;
