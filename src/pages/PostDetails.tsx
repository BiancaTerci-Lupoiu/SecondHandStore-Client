import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { Post } from "../interfaces/Post";
import { useState, useEffect, useContext } from "react";
import PostContext from "../store/manipulate-posts-context";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { domain } from "../utils/apiCallsHandler";
import UserInfo from "../components/UserInfo";
import { createCheckoutSession } from "../network/purchases";
import { getAuthToken } from "../utils/auth";
import { StripeCheckoutResponse } from "../interfaces/Payment";
import { getPostById } from "../network/posts";

const PostDetails: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const { posts } = useContext(PostContext);

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
            boxShadow: `10px 10px ${theme.palette.primary.main}`,
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
              <Typography
                sx={{
                  marginLeft: "60px",
                  fontWeight: "bold",
                  display: "inline",
                  fontStyle: "italic",
                }}
                variant="h5"
              >{`${post.price} Lei`}</Typography>
              <Button
                sx={{
                  marginLeft: "10px",
                  marginBottom: "10px",
                  fontSize: "15px",
                }}
                variant="contained"
                onClick={handleCheckout}
              >
                Cumpără
              </Button>
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
