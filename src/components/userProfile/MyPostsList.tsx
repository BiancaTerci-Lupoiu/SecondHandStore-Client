import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Post } from "../../interfaces/Post";
import PostContext from "../../store/manipulate-posts-context";
import { domain } from "../../utils/apiCallsHandler";
import DeletePostModal from "../posts/DeletePostModal";
import EditPostModal from "../posts/EditPostModal";

const MyPostsList = () => {
  const theme = useTheme();
  const { postsForUser, getAllPostsForUser, timestamp } =
    useContext(PostContext);

  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [selectedPostForDelete, setSelectedPostForDelete] = useState<
    string | null
  >(null);

  useEffect(() => {
    getAllPostsForUser?.();
  }, []);

  return (
    <>
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
          <ListItem
            key={post._id}
            alignItems="flex-start"
            sx={{
              bgcolor: "white",
              borderRadius: "5px",
              marginBottom: "1.5vh",
              marginTop: "1.5vh",
              boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
            }}
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  sx={{
                    marginRight: "1px",
                  }}
                  onClick={() => {
                    setSelectedPost(post);
                    setOpenEditPostModal(true);
                  }}
                >
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    setSelectedPostForDelete(post._id);
                    setOpenDeletePostModal(true);
                  }}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt="Remy Sharp"
                src={`${domain}/images/posts/${post.picture}?timestamp=${timestamp}`}
                sx={{
                  boxShadow: `${theme.shadows[10]}`,
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "5px",
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              sx={{ paddingRight: "10px" }}
              secondary={
                <React.Fragment>
                  <span>
                    {post.description.length < 47
                      ? post.description
                      : post.description.substring(0, 47) + "..."}
                  </span>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      {selectedPost && (
        <EditPostModal
          open={openEditPostModal}
          setOpen={setOpenEditPostModal}
          post={selectedPost}
        />
      )}
      {selectedPostForDelete && (
        <DeletePostModal
          open={openDeletePostModal}
          setOpen={setOpenDeletePostModal}
          postId={selectedPostForDelete}
        />
      )}
    </>
  );
};

export default MyPostsList;
