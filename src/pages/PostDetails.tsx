import {
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPostById } from "../api/posts";
import { createCheckoutSession } from "../api/purchases";
import UserInfo from "../components/userProfile/UserInfo";
import { StripeCheckoutResponse } from "../interfaces/Payment";
import { Post } from "../interfaces/Post";
import PostContext from "../store/manipulate-posts-context";
import { domain } from "../utils/apiCallsHandler";
import { getAuthToken } from "../utils/auth";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../store/auth-context";

const PostDetails: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const { posts } = useContext(PostContext);
  const navigate = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const postId = params.postId;
      const post = await getPostById(postId || "");
      setPost(post);
    })();
  }, []);

  const handleCheckout = () => {
    const token = getAuthToken();
    console.log(token);
    if (!token) {
      enqueueSnackbar("You need to login first!", {
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
      return;
    }
    createCheckoutSession(post!, getAuthToken() || "")
      .then((res: StripeCheckoutResponse) => {
        console.log(res);
        if (res.url) {
          window.location.href = res.url;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (post) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",

            marginTop: "30px",
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `10px 5px  ${theme.palette.primary.main}`,
            marginBottom: "5px",
            // boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img
                width="300px"
                height="500px"
                style={{
                  objectFit: "cover",
                  border: "2px solid black",
                  borderRadius: "8px",
                  margin: "5px 5px",
                }}
                src={`${domain}/images/posts/${post.picture}`}
              />
              <div style={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "-50px",
                  }}
                  gutterBottom
                  variant="h4"
                >
                  {post.title}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ margin: "auto" }}>
              <Paper sx={{ padding: "10px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Descriere:
                </Typography>

                <Typography variant="h6">{post.description}</Typography>
              </Paper>
              <br />
              <br />
              <UserInfo user={post.user} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3.8}
              sx={{
                margin: "auto",
              }}
            >
              {/* clothes details */}
              <Paper
                sx={{
                  padding: "15px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "20px",
                    marginLeft: "10px",
                  }}
                >
                  Detalii produs:
                </Typography>
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Mărime:
                    <span style={{ fontSize: "15px" }}>{" " + post.size}</span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Sex:
                    <span style={{ fontSize: "15px" }}>
                      {" " + post.gender}
                    </span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Brand:
                    <span style={{ fontSize: "15px" }}>{" " + post.brand}</span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Stil:
                    <span style={{ fontSize: "15px" }}>{" " + post.style}</span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Materiale:
                    <span style={{ fontSize: "15px" }}>
                      {" " + String(post.materials)}
                    </span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Typography variant="h6">
                    Culoare:
                    <span style={{ fontSize: "15px" }}>{" " + post.color}</span>
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div
                  style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "15px",
                  }}
                >
                  <Typography variant="h6">
                    Condiție:
                    <span style={{ fontSize: "15px" }}>
                      {" " + post.condition}
                    </span>
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                margin: " 0 auto",
              }}
            >
              <Box sx={{ marginBottom: "10px" }}>
                <Typography
                  sx={{
                    marginLeft: "60px",
                    fontWeight: "bold",
                    display: "inline",

                    fontStyle: "italic",
                  }}
                  variant="h5"
                >{`${post.price} Lei`}</Typography>
                {loggedUser?._id != post.user._id && (
                  <Button
                    sx={{
                      marginLeft: "10px",
                      fontSize: "15px",
                    }}
                    variant="contained"
                    onClick={handleCheckout}
                  >
                    Cumpără
                  </Button>
                )}
              </Box>
            </div>
          </div>
        </Card>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default PostDetails;
