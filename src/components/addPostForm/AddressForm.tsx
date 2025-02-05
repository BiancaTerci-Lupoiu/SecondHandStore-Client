import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CityFetchedType } from "../../interfaces/City";
import AddPostContext from "../../store/add-post-context";
import SelectMapLocation from "../maps/SelectMapLocation";

const AddressForm: React.FC<{
  handleNext: () => void;
  handleBack: () => void;
}> = ({ handleNext, handleBack }) => {
  const theme = useTheme();

  const { address, updateAddress, iban, updateIban, savePost, postDetails } =
    useContext(AddPostContext);

  const [locality, setLocality] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [zipCode, setZipcode] = useState<number>(0);
  const [cityErrorText, setCityErrorText] = useState("");
  const [localityErrorText, setLocalityErrorText] = useState("");
  const [numberErrorText, setNumberErrorText] = useState("");
  const [streetErrorText, setStreetErrorText] = useState("");
  const [zipcodeErrorText, setZipcodeErrorText] = useState("");
  const [ibanErrorText, setIbanErrorText] = useState("");

  const [cities, setCities] = useState<CityFetchedType[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  // first set the cities on load
  useEffect(() => {
    axios.get("https://roloca.coldfuse.io/judete").then((response) => {
      console.log(response.data);
      setCities(response.data);
    });

    if (address) {
      console.log("setam valorile");
      setSelectedCity(address.city);
      setStreet(address.street);
      setNumber(address.number);
      setZipcode(address.zipCode);
      setLocality(address.locality);
    }
  }, []);

  // on city change, set the localities in that city
  useEffect(() => {
    console.log("Selected city: " + selectedCity);
    if (selectedCity && cities.length > 0) {
      console.log("cities length: " + cities.length);
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
  }, [selectedCity, cities]);

  function validateInput() {
    let isValid = true;

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
    if (!iban) {
      setIbanErrorText("Iban required!");
      isValid = false;
    } else {
      setIbanErrorText("");
    }

    return isValid;
  }

  const handleSubmit = async () => {
    const isInputValid = validateInput();
    //const isInputValid = true;
    if (!isInputValid) {
      return;
    }
    updateAddress?.({ locality, city: selectedCity, street, number, zipCode });

    // add post logic
    savePost?.(
      postDetails!,
      {
        locality,
        city: selectedCity,
        street,
        number,
        zipCode,
      },
      iban
    );

    handleNext();
  };

  return (
    <Container component="div" maxWidth="sm">
      <Typography
        component="h1"
        variant="h5"
        align="center"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Address details
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
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
              value={locality}
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
              value={street}
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
              value={number}
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
              value={zipCode}
              onChange={(event) => setZipcode(Number(event.target.value))}
              error={!!zipcodeErrorText}
              helperText={zipcodeErrorText}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SelectMapLocation />
          </Grid>
          {/* iban info */}
          <Typography
            component="h1"
            variant="h5"
            align="center"
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
              onChange={(event) => updateIban?.(event.target.value)}
              error={!!ibanErrorText}
              helperText={ibanErrorText}
            />
          </Grid>
        </Grid>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          mr: 1,
          width: "20px",
          bgcolor: theme.palette.secondary.main,
        }}
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          width: "20px",
          bgcolor: theme.palette.secondary.main,
        }}
        onClick={handleSubmit}
      >
        Add post
      </Button>
    </Container>
  );
};

export default AddressForm;
