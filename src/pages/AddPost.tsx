import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserDetails } from "../api/users";
import AddPostFinishStep from "../components/addPostForm/AddPostFinishStep";
import AddPostForm from "../components/addPostForm/AddPostForm";
import AddressForm from "../components/addPostForm/AddressForm";
import AddPostContext from "../store/add-post-context";
import AuthContext from "../store/auth-context";
import { getAuthToken } from "../utils/auth";

const steps = ["Item details", "Address info", "Finish"];

const AddPost = () => {
  const tokenLS = getAuthToken();
  const { token } = useContext(AuthContext);
  const { updateAddress, updateIban } = useContext(AddPostContext);

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenLS && !token) {
      setOpenSnackBar(true);
      setSnackBarMessage("Please, login first!");
    } else
      (async () => {
        const userDetails = await getUserDetails(tokenLS || token);
        if (userDetails.address) {
          updateAddress?.(userDetails.address);
        }
        if (userDetails.iban) {
          updateIban?.(userDetails.iban);
        }
      })();
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevState: number) => {
      return prevState + 1;
    });
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddPostForm handleNext={handleNext} />;
      case 1:
        return <AddressForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <AddPostFinishStep handleBack={handleBack} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleBack = () => {
    setActiveStep((prevState: number) => {
      return prevState - 1;
    });
  };

  function handleCloseSnackBar(
    event: React.SyntheticEvent | Event,
    reason?: string
  ) {
    if (reason === "clickaway") {
      navigate("/login");
      return;
    }
    navigate("/login");
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

  return (
    <>
      <Paper style={{ height: "auto" }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ marginBottom: "15px", marginTop: "5vh" }}
        >
          Sell new item
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
      </Paper>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={snackBarMessage}
        action={action}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </>
  );
};

export default AddPost;
