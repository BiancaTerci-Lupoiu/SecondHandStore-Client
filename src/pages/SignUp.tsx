import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import ShopIcon from "../components/ShopIcon";
import { CityFetchedType } from "../interfaces/City";

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

const SignUp: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [zipCode, setZipcode] = useState<number>(0);

  const [emailErrorText, setEmailErrorText] = useState("");
  const [firstNameErrorText, setFirstNameErrorText] = useState("");
  const [lastNameErrorText, setLastNameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [cityErrorText, setCityErrorText] = useState("");
  const [localityErrorText, setLocalityErrorText] = useState("");
  const [numberErrorText, setNumberErrorText] = useState("");
  const [streetErrorText, setStreetErrorText] = useState("");
  const [zipcodeErrorText, setZipcodeErrorText] = useState("");
  const [iban, setIban] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [openSnackBarSignUpSuccessful, setOpenSnackBarSignUpSuccessful] =
    useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  // Address logic
  const [hasAddress, setHasAddress] = useState<boolean>(false);
  const [cities, setCities] = useState<CityFetchedType[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  // first set the cities on load
  useEffect(() => {
    axios.get("https://roloca.coldfuse.io/judete").then((response) => {
      console.log(response.data);
      setCities(response.data);
    });
  }, []);

  // on city change, set the localities in that city
  useEffect(() => {
    console.log("Selected city: " + selectedCity);
    if (selectedCity) {
      const shortcut = cities.find((city) => city.nume === selectedCity)?.auto;

      axios
        .get(`https://roloca.coldfuse.io/orase/${shortcut}`)
        .then((response) => {
          console.log(
            response.data.map((locality: { nume: string }) => locality.nume)
          );
          setLocalities(
            response.data
              .map((locality: { nume: string }) => locality.nume)
              .sort()
              .filter(
                (value: string, index: number, array: string[]) =>
                  array.indexOf(value) === index
              )
          );
        });
    }
  }, [selectedCity]);

  const navigate = useNavigate();
  const theme = useTheme();

  function validateInput() {
    let isValid = true;
    if (!email) {
      setEmailErrorText("Email required!");
      isValid = false;
    } else {
      if (!email.includes("@")) {
        setEmailErrorText("Email not valid!");
      } else {
        setEmailErrorText("");
      }
    }
    if (!firstName) {
      setFirstNameErrorText("First name required");
      isValid = false;
    } else {
      setFirstNameErrorText("");
    }
    if (!lastName) {
      setLastNameErrorText("Last name required");
      isValid = false;
    } else {
      setLastNameErrorText("");
    }
    if (!phone) {
      setPhoneErrorText("Phone number required");
      isValid = false;
    } else {
      setPhoneErrorText("");
    }
    if (!password || !repeatPassword) {
      setPasswordErrorText("Password required!");
      isValid = false;
    } else {
      if (password !== repeatPassword) {
        setPasswordErrorText("Passwords does not match!");
        isValid = false;
      } else {
        setPasswordErrorText("");
      }
    }
    if (hasAddress) {
      if (!selectedCity) {
        setCityErrorText("City required!");
        isValid = false;
      } else {
        setCityErrorText("");
      }
      if (!locality) {
        setLocalityErrorText("Locality required!");
        isValid = false;
      } else {
        setLocalityErrorText("");
      }
      if (!number || number <= 0) {
        setNumberErrorText("Number required!");
        isValid = false;
      } else {
        setNumberErrorText("");
      }
      if (!street) {
        setStreetErrorText("Street required!");
        isValid = false;
      } else {
        setStreetErrorText("");
      }
      if (!zipCode || zipCode <= 0) {
        setZipcodeErrorText("Zipcode required!");
        isValid = false;
      } else {
        setZipcodeErrorText("");
      }
    }

    return isValid;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // form validation
    if (!validateInput()) {
      return;
    }
    const address = hasAddress
      ? { locality, city: selectedCity, street, number, zipCode }
      : undefined;

    signUp({
      firstName,
      lastName,
      email,
      password,
      phoneNumber: phone,
      address,
      iban: iban ? iban : undefined,
    })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Sign Up successful! Please check your email!", {
          action: (snackbarId) => (
            <IconButton
              sx={{ color: "white" }}
              onClick={() => {
                closeSnackbar(snackbarId);
                navigate("/login");
              }}
            >
              <CloseIcon />
            </IconButton>
          ),
        });
        //setOpenSnackBarSignUpSuccessful(true);
      })
      .catch((error) => {
        console.log("Error", error.response.data);
        const messages: string[] = error.response.data.message.split(";");
        enqueueSnackbar(
          <div>
            {messages.map((message) => (
              <Typography key={message}>{message}</Typography>
            ))}
          </div>
        );
        // setSnackBarMessage(error.response.data.message);
        // setOpenSnackBar(true);
      });
  }

  function handleCloseSnackBar(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }

  function handleCloseSnackBarOnSignUpSuccessful(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarSignUpSuccessful(false);
    navigate("/login");
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

  const actionIfSignUpSuccessful = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBarOnSignUpSuccessful}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Grid container spacing={2}>
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ShopIcon />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenume"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value)}
                  error={!!firstNameErrorText}
                  helperText={firstNameErrorText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nume"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLastName(event.target.value)}
                  error={!!lastNameErrorText}
                  helperText={lastNameErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  error={!!emailErrorText}
                  helperText={emailErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Parolă"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                  error={!!passwordErrorText}
                  helperText={passwordErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Confirmă parola"
                  type="password"
                  id="password-confirm"
                  autoComplete="new-password"
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  error={!!passwordErrorText}
                  helperText={passwordErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Telefon"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                  onChange={(event) => setPhone(event.target.value)}
                  error={!!phoneErrorText}
                  helperText={phoneErrorText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontSize: 18,
                bgcolor: theme.palette.secondary.main,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login">Already have an account? Log in</NavLink>
              </Grid>
            </Grid>
            <Snackbar
              open={openSnackBar}
              autoHideDuration={4000}
              onClose={handleCloseSnackBar}
              message={snackBarMessage}
              action={action}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            />
            <Snackbar
              open={openSnackBarSignUpSuccessful}
              autoHideDuration={6000}
              onClose={handleCloseSnackBarOnSignUpSuccessful}
              message={snackBarMessage}
              action={actionIfSignUpSuccessful}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            />
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            marginLeft: -8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>
            <Typography component="h5" variant="h5" sx={{ display: "inline" }}>
              You can add Address and payment information if you want (this will
              be used when you place an order or when you sell an item):
            </Typography>
            <Switch
              checked={hasAddress}
              onChange={(event) => {
                setHasAddress((prevValue: boolean) => {
                  return !prevValue;
                });
              }}
            />
          </span>
          {hasAddress && (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="city"
                    fullWidth
                    id="city"
                    label="Județ"
                    autoFocus
                    value={selectedCity}
                    onChange={(event) => {
                      console.log(event.target);
                      setSelectedCity(event.target.value);
                    }}
                    error={!!cityErrorText}
                    helperText={cityErrorText}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.auto} value={city.nume}>
                        {city.nume}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    id="locality"
                    label="Oraș/Localitate"
                    defaultValue={""}
                    name="locality"
                    onChange={(event) => setLocality(event.target.value)}
                    error={!!localityErrorText}
                    helperText={localityErrorText}
                  >
                    {localities.map((locality) => (
                      <MenuItem key={locality} value={locality}>
                        {locality}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="street"
                    label="Strada"
                    name="street"
                    autoComplete="street"
                    onChange={(event) => setStreet(event.target.value)}
                    error={!!streetErrorText}
                    helperText={streetErrorText}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="number"
                    type="number"
                    fullWidth
                    id="number"
                    label="Număr"
                    autoFocus
                    onChange={(event) => setNumber(Number(event.target.value))}
                    error={!!numberErrorText}
                    helperText={numberErrorText}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    id="zipCode"
                    label="Cod poștal"
                    name="zipCode"
                    onChange={(event) => setZipcode(Number(event.target.value))}
                    error={!!zipcodeErrorText}
                    helperText={zipcodeErrorText}
                  />
                </Grid>
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  sx={{ marginTop: "20px" }}
                >
                  IBAN:
                </Typography>
                <Grid item xs={12}>
                  {/* <InputLabel>IBAN:</InputLabel> */}
                  <TextField
                    fullWidth
                    id="iban"
                    label="IBAN"
                    name="iban"
                    autoComplete="iban"
                    value={iban}
                    onChange={(event) => setIban(event.target.value)}
                    //   error={!!streetErrorText}
                    //   helperText={streetErrorText}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </Grid>
  );
};

export default SignUp;
