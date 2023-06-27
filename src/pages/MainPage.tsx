import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import FiltersBar from "../components/filters/FiltersBar";
import ItemCard from "../components/posts/ItemCard";
import PostContext from "../store/manipulate-posts-context";
const MainPage = () => {
  const { posts, fetching, getAllPosts } = useContext(PostContext);

  const [openLoadingModal, setOpenLoadingModal] = useState(false);

  useEffect(() => {
    getAllPosts?.();
  }, []);

  useEffect(() => {
    if (fetching) {
      setOpenLoadingModal(true);
    } else {
      setOpenLoadingModal(false);
    }
  }, [fetching]);

  return (
    <>
      <FiltersBar />
      <Box
        sx={{
          marginTop: "50px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "60px",
        }}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={4} md={4}>
            <ItemCard post={post} />
          </Grid>
        ))}
      </Box>
      <LoadingComponent open={openLoadingModal} setOpen={setOpenLoadingModal} />
    </>
  );
};

export default MainPage;
