import {
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Grid,
} from "@mui/material";
import AddPostContext from "../store/add-post-context";
import { useContext } from "react";
const AddPostFinishStep = () => {
  const { savingError } = useContext(AddPostContext);
  console.log(savingError);
  return (
    <Container
      component="div"
      maxWidth="sm"
      style={{
        display: "flex",
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
              }}
            >
              Your post has been succesfully uploaded!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <IconButton
              size="medium"
              edge="end"
              aria-label="menu"
              href="/main"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Click here to return to the main page
            </IconButton>
          </Grid>
        </Grid>
      )}
      {savingError && (
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
              Sorry sth went wrong
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <IconButton
              size="medium"
              edge="end"
              aria-label="menu"
              href="/main"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Click here to return to the main page
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AddPostFinishStep;
