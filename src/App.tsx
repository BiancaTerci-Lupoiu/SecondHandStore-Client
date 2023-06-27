import "./App.css";
import { CssBaseline, IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import AuthProvider from "./store/AuthProvider";
import AddPostProvider from "./store/AddPostProvider";
import PostProvider from "./store/PostProvider";
import { SnackbarProvider } from "notistack";
import { theme } from "./utils/theme";
import { router } from "./router/router";

function App() {
  return (
    <div>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={(snackbarId) => (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        )}
      />
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
