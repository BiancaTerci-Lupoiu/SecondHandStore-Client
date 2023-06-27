import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AuthContext from "../store/auth-context";
import { useTheme } from "@mui/material";
import ShopIcon from "../components/ShopIcon";
import { getAuthToken } from "../utils/auth";
import logo from "../assets/logo.png";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SecondLife
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const { token, login, loginError } = useContext(AuthContext);

  const theme = useTheme();

  function handleCloseSnackBar(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const navigate = useNavigate();

  useEffect(() => {
    const tokenLS = getAuthToken();
    console.log("TOKENURI ", token, tokenLS);
    if (token || tokenLS) {
      console.log("token ", token, "Already logged in");
      navigate("/main");
    }
  }, [token, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("email ", email);
    console.log("password ", password);
    (async () => {
      const isLoginSuccessful = await login?.(email, password);
      console.log("A reusit login: ", isLoginSuccessful);
      if (isLoginSuccessful) {
        console.log("N-avem eroare");
        navigate("/main");
      } else {
        if (loginError) {
          console.log("Avem eroare: ", loginError);
          setOpenSnackBar(true);
          setSnackBarMessage(loginError);
        }
      }
    })();
  }

  useEffect(() => {
    if (loginError) {
      console.log("Avem eroare: ", loginError);
      setOpenSnackBar(true);
      setSnackBarMessage(loginError);
    }
  }, [loginError]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ShopIcon />
            <Typography component="h4" variant="h4">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              >
                {email}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              >
                {password}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: theme.palette.secondary.main,
                  fontSize: 14,
                }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={snackBarMessage}
                action={action}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
