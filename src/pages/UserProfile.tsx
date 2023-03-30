import { Context, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import "../css/UserProfile.css";
import { Textarea } from "@mui/joy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTheme } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { getUserDetails, uploadUserPicture } from "../network/users";
import { getAuthToken } from "../utils/auth";
import User, { UserWithoutSensitiveInfo } from "../interfaces/User";
import AuthContext from "../store/auth-context";
import { domain } from "../utils/apiCallsHandler";
import PostContext from "../store/manipulate-posts-context";
import MyPostsList from "../components/MyPostsList";
import EditProfileModal from "../components/EditProfileModal";

const UserProfile = () => {
  const theme = useTheme();

  const { token, getDetailsForUser, loggedUser } = useContext(AuthContext);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [hideButton, setHideButton] = useState<boolean>(true);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const tokenLS = getAuthToken();

  useEffect(() => {
    if (!tokenLS && !token) {
      navigate("/login");
    }
    if (!loggedUser && (tokenLS || token))
      (async () => {
        await getDetailsForUser?.();
      })();
  }, [token, tokenLS]);

  //   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     setDisabled(true);
  //     setHideButton(true);
  //     if (loggedUser) {
  //       updateUser({
  //         ...loggedUser,
  //         biography: biography,
  //         firstName,
  //         lastName,
  //         phoneNumber,
  //       })
  //         .then(() => {
  //           console.log("Update user");
  //           getUserByEmail(loggedUserEmail)
  //             .then((user: UserInterface) => {
  //               console.log("after update ", user);
  //               setLoggedUser(user);
  //               setSnackBarMessage("Info updated successfully!");
  //               setOpenSnackBar(true);
  //             })
  //             .catch((error) => {
  //               console.log("the user does not exist");
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error.response.data, " could not make the update");
  //           setSnackBarMessage("Sorry, something went wrong! :(");
  //           setOpenSnackBar(true);
  //         });
  //     }
  //   }

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

  const handleUploadImage = (event: any) => {
    if (
      event.target.files &&
      (event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/jpeg")
    ) {
      const fileUploaded = event.target.files[0];
      console.log("Logged user ID ", loggedUser);
      uploadUserPicture(fileUploaded, loggedUser!._id, tokenLS || token)
        .then((res) => {
          console.log(res);
          (async () => {
            await getDetailsForUser?.();
          })();
        })
        .catch((error) => {
          // ADD SNACKBAR FOR ERROR
          console.log(error);
        });
    }
  };

  console.log("RENDEEEEEEER");

  return (
    <>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <div className="MainProfileDiv">
          <div className="profile-container">
            <div className="top-portion">
              <div
                className="user-profile-bg-image"
                style={{ background: theme.palette.primary.light }}
              >
                <img src="" alt=""></img>
              </div>
              {loggedUser && loggedUser.picture && (
                <Avatar
                  sx={{
                    width: 250,
                    height: 250,
                    position: "absolute",
                    transform: "translateX(50%)",
                    right: "50%",
                    bottom: "-1rem",
                    boxShadow: "1px 1px 12px 3px rgba(0,0,0,.8)",
                  }}
                  alt="Remy Sharp"
                  src={`${domain}/images/users/${loggedUser.picture}`}
                  className="avatar"
                  onClick={(event: any) => {
                    if (hiddenFileInput && hiddenFileInput.current) {
                      hiddenFileInput.current.click();
                    }
                  }}
                />
              )}
              {loggedUser && !loggedUser.picture && (
                <Avatar
                  sx={{
                    width: 250,
                    height: 250,
                    position: "absolute",
                    transform: "translateX(50%)",
                    right: "50%",
                    bottom: "-1rem",
                    boxShadow: "1px 1px 12px 3px rgba(0,0,0,.8)",
                    fontSize: "60px",
                  }}
                  title="change picture"
                  alt="Remy Sharp"
                  className="avatar"
                  onClick={(event: any) => {
                    if (hiddenFileInput && hiddenFileInput.current) {
                      hiddenFileInput.current.click();
                    }
                  }}
                >
                  {loggedUser.firstName[0] + loggedUser.lastName[0]}
                </Avatar>
              )}
              <input
                accept="image/*"
                type="file"
                ref={hiddenFileInput}
                onChange={handleUploadImage}
                style={{
                  display: "none",
                }} /* Make the file input element invisible */
              />
              <div>
                {loggedUser && (
                  <div className="userName">{`${loggedUser.firstName} ${loggedUser.lastName}`}</div>
                )}
                <div
                  className="icon-div"
                  onClick={() => {
                    setDisabled(false);
                    setHideButton(false);
                  }}
                >
                  <BorderColorIcon />
                </div>
              </div>
            </div>
            <div className="bottom-portion">
              {loggedUser && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      sx={{
                        width: "70%",
                        marginLeft: "4vw",
                        padding: "10px",
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        boxShadow: theme.shadows[10],
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginBottom: "30px" }}
                      >
                        Contact:
                      </Typography>

                      <div style={{ display: "flex" }}>
                        <Typography
                          align="center"
                          variant="h6"
                          sx={{ justifyContent: "center" }}
                        >
                          Email:
                          <span
                            style={{ fontSize: "15px", fontStyle: "italic" }}
                          >
                            {"   " + loggedUser.email}
                          </span>
                        </Typography>
                      </div>
                      <Divider
                        variant="middle"
                        sx={{
                          marginTop: "7px",
                          marginBottom: "7px",
                          bgcolor: theme.palette.primary.contrastText,
                        }}
                      />
                      <div style={{ display: "flex" }}>
                        <Typography variant="h6">
                          Telefon:
                          <span
                            style={{ fontSize: "15px", fontStyle: "italic" }}
                          >
                            {"   " + loggedUser.phoneNumber}
                          </span>
                        </Typography>
                      </div>
                    </Paper>
                    <Button
                      variant="contained"
                      sx={{
                        margin: "4vw",
                        bgcolor: theme.palette.secondary.main,
                        fontSize: "14px",
                      }}
                      onClick={() => setOpenEditModal(true)}
                    >
                      Edit profile
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      sx={{
                        width: "75%",
                        marginLeft: "3vw",
                        padding: "10px",
                        paddingBottom: "1px",
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        boxShadow: theme.shadows[10],
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginBottom: "30px" }}
                      >
                        Anunțuri publicate:
                        <MyPostsList />
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message={snackBarMessage}
                action={action}
              />
            </div>
          </div>
        </div>
      </Grid>
      <EditProfileModal open={openEditModal} setOpen={setOpenEditModal} />
    </>
  );
};

export default UserProfile;
