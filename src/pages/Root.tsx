import { Outlet } from "react-router-dom";
import MainNavigation from "../components/menuBar/MainNavigation";
import classes from "../css/Root.module.css";

import Box from "@mui/material/Box";
import * as React from "react";
import { DrawerHeader } from "../components/menuBar/DrawerHeader";
import { Main } from "../components/menuBar/Main";
import MenuDrawer from "../components/menuBar/MenuDrawer";

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
