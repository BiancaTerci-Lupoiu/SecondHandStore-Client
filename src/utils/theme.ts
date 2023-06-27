import { createTheme } from "@mui/material/styles";
// define theme
export const theme = createTheme({
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
      contrastText: "#999999",
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
