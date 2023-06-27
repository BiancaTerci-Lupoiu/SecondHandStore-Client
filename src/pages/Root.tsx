import { Outlet } from "react-router-dom";
import MainNavigation from "../components/menuBar/MainNavigation";
import classes from "../css/Root.module.css";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuDrawer from "../components/menuBar/MenuDrawer";
import { DrawerHeader } from "../components/menuBar/DrawerHeader";
import { Main } from "../components/menuBar/Main";

const RootLayout: React.FC = () => {
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
