import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import AddPostContext from "../../store/add-post-context";
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
        Apasă aici ca să revii la pagina principală
      </IconButton>
    </Grid>
  );

  if (saving) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Postarea se salvează...</Typography>
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
              Postarea a fost salvată cu succes!
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
                SNe pare rău, ceva nu a mers bine!
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
