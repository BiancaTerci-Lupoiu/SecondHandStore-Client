import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CssBaseline, Box, Typography, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";

import AuthProvider from "./store/AuthProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import MainPage from "./pages/MainPage";
import AddPost from "./pages/AddPost";
import AddPostProvider from "./store/AddPostProvider";
import PostProvider from "./store/PostProvider";
import PostDetails from "./pages/PostDetails";
import CheckoutSuccess from "./components/CheckoutSuccess";
import UserProfile from "./pages/UserProfile";
import AboutPage from "./pages/AboutPage";

// define theme
const theme = createTheme({
  palette: {
    primary: {
      light: "#9575cd",
      main: "#673ab7",
      dark: "#482880",
      contrastText: "#fff",
    },
    secondary: {
      main: "#651fff",
      light: "#dacfed",
      dark: "#4615b2",
      contrastText: "#fff",
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
//#c29fff;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //loader: tokenLoader,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        index: true,
        path: "main",
        element: <MainPage />,
        //loader: checkAuthLoader,
      },
      {
        path: "sell-item",
        element: <AddPost />,
      },
      {
        path: ":postId",
        element: <PostDetails />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PostProvider>
          <AuthProvider>
            <AddPostProvider>
              <RouterProvider router={router} />
            </AddPostProvider>
          </AuthProvider>
        </PostProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
