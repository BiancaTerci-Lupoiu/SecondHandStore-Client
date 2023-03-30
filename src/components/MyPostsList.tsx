import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useContext, useEffect } from "react";
import { Post } from "../interfaces/Post";
import PostContext from "../store/manipulate-posts-context";
import EditIcon from "@mui/icons-material/Edit";
import { domain } from "../utils/apiCallsHandler";
import { useTheme } from "@mui/material";

const MyPostsList = () => {
  const theme = useTheme();
  const { postsForUser, getAllPostsForUser } = useContext(PostContext);

  useEffect(() => {
    getAllPostsForUser?.();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "95%",
        maxHeight: "30vh",
        overflow: "auto",
        color: "black",
        margin: "auto",
      }}
    >
      {postsForUser.map((post: Post) => (
        <>
          <ListItem
            alignItems="flex-start"
            sx={{
              bgcolor: "white",
              borderRadius: "5px",
              marginBottom: "1.5vh",
              marginTop: "1.5vh",
              boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <EditIcon color="primary" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt="Remy Sharp"
                src={`${domain}/images/posts/${post.picture}`}
                sx={{
                  boxShadow: `${theme.shadows[10]}`,
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "5px",
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={
                <React.Fragment>
                  <span>
                    {post.description.length < 47
                      ? post.description
                      : post.description.substring(0, 47) + "..."}
                  </span>{" "}
                </React.Fragment>
              }
            />
          </ListItem>
        </>
      ))}
    </List>
  );
};

export default MyPostsList;
