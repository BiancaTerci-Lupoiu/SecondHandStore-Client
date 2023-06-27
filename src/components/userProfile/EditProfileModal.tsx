import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { EditUserModalProps } from "../../interfaces/ModalProps";
import AddressForm from "../addPostForm/AddressForm";
import { Grid, MenuItem, TextField } from "@mui/material";
import { CityFetchedType } from "../../interfaces/City";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { updateUser } from "../../api/users";
import { UpdateUserBody } from "../../interfaces/User";
import { getAuthToken } from "../../utils/auth";
import { useTheme } from "@mui/material/styles";
import { modalStyle } from "../../utils/modals";
import { enqueueSnackbar } from "notistack";

const EditProfileModal: React.FC<EditUserModalProps> = (props) => {
  const { open, setOpen, user } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const { getDetailsForUser } = useContext(AuthContext);

  const [phone, setPhone] = useState<string>(user.phoneNumber);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);

  const [locality, setLocality] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [zipCode, setZipcode] = useState<number>(0);

  const [firstNameErrorText, setFirstNameErrorText] = useState("");
  const [lastNameErrorText, setLastNameErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [cityErrorText, setCityErrorText] = useState("");
  const [localityErrorText, setLocalityErrorText] = useState("");
  const [numberErrorText, setNumberErrorText] = useState("");
  const [streetErrorText, setStreetErrorText] = useState("");
  const [zipcodeErrorText, setZipcodeErrorText] = useState("");

  const [iban, setIban] = useState("");

  // Address logic
  const [cities, setCities] = useState<CityFetchedType[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  // first set the cities on load
  useEffect(() => {
    axios.get("https://roloca.coldfuse.io/judete").then((response) => {
      // console.log(response.data);
      setCities(response.data);
    });
    if (user.address) {
      const address = user.address;
      console.log("setam valorile");
      setSelectedCity(address.city);
      setStreet(address.street);
      setNumber(address.number);
      setZipcode(address.zipCode);
      setLocality(address.locality);
    }
    if (user.iban) {
      setIban(user.iban);
    }
  }, []);

  // on city change, set the localities in that city
  useEffect(() => {
    console.log("Selected city: " + selectedCity);
    if (selectedCity && cities.length > 0) {
      const shortcut = cities.find((city) => city.nume === selectedCity)?.auto;

      axios
        .get(`https://roloca.coldfuse.io/orase/${shortcut}`)
        .then((response) => {
          // console.log(
          //   response.data.map((locality: { nume: string }) => locality.nume)
          // );
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
  }, [selectedCity, cities]);

  function validateInput() {
    let isValid = true;

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

    return isValid;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateInput();

    if (!isValid) {
      return;
    }

    const updateUserBody: UpdateUserBody = {
      lastName,
      firstName,
      phoneNumber: phone,
      address: { zipCode, street, locality, city: selectedCity, number },
      iban: iban ? iban : undefined,
    };

    try {
      const token = getAuthToken();

      const response = await updateUser(updateUserBody, user._id, token);
      await getDetailsForUser?.();
      enqueueSnackbar("Profile successfully updated!");

      handleClose();
    } catch (error: any) {
      const messages: string[] = error.response.data.message.split(";");
      enqueueSnackbar(
        <div>
          {messages.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </div>,
        { persist: true }
      );
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ marginBottom: "10px" }}
            >
              Edit profile
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
                    value={firstName}
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
                    value={lastName}
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
                    value={phone}
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
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                Adresă:
              </Typography>
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
                    value={locality}
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
                    value={street}
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
                    value={number}
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
                    value={zipCode}
                    type="number"
                    id="zipCode"
                    label="Cod poștal"
                    name="zipCode"
                    onChange={(event) => setZipcode(Number(event.target.value))}
                    error={!!zipcodeErrorText}
                    helperText={zipcodeErrorText}
                  />
                </Grid>
              </Grid>
              {/* iban info */}
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginTop: "20px", marginBottom: "20px" }}
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
              <Button
                type="submit"
                variant="contained"
                sx={{
                  float: "right",
                  marginTop: "20px",
                  bgcolor: theme.palette.secondary.main,
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
