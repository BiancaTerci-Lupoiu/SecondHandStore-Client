import ItemCard from "../components/ItemCard";
import { post } from "../mocks/mockedPost";
import { useState, useEffect, useContext } from "react";
import { Post } from "../interfaces/Post";
import PostContext from "../store/manipulate-posts-context";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
const MainPage = () => {
  const { posts, fetching, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts?.();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      style={{
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 50,
      }}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={4} md={4}>
          <ItemCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPage;
