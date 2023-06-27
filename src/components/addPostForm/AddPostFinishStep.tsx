import {
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import AddPostContext from "../../store/add-post-context";
import { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
const AddPostFinishStep: React.FC<{ handleBack: () => void }> = ({
  handleBack,
}) => {
  const { savingError, saving } = useContext(AddPostContext);
  console.log(savingError);
  const theme = useTheme();
  const [errorShown, setErrorShown] = useState(false);

  // if (savingError && !errorShown) {
  //   console.log(savingError);
  //   const messages: string[] = savingError.split(";");
  //   setErrorShown(true);
  //   enqueueSnackbar(
  //     <div>
  //       {messages.map((message) => (
  //         <Typography key={message}>{message}</Typography>
  //       ))}
  //     </div>,
  //     { autoHideDuration: 10000 }
  //   );
  // }

  const returnToMainPage = (
    <Grid
      item
      xs={12}
      sm={12}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <IconButton
        size="medium"
        edge="end"
        aria-label="menu"
        href="/main"
        style={{
          padding: "8px 30px",
          borderRadius: "30px",
          width: "fit-content",
        }}
      >
        Click here to return to the main page
      </IconButton>
    </Grid>
  );

  if (saving) {
    return (
      <Box>
        <Typography>Post is saving</Typography>
      </Box>
    );
  }

  return (
    <Container
      component="div"
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      {!savingError && (
        <Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Your post has been succesfully uploaded!
            </Typography>
          </Grid>
          {returnToMainPage}
        </Grid>
      )}
      {savingError && (
        <>
          <Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Sorry, something went wrong
              </Typography>
            </Grid>

            {returnToMainPage}
          </Grid>
        </>
      )}
      {savingError && (
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            mr: 1,
            width: "20px",
            alignSelf: "flex-start",
            bgcolor: theme.palette.secondary.main,
          }}
          onClick={handleBack}
        >
          Back
        </Button>
      )}
    </Container>
  );
};

export default AddPostFinishStep;