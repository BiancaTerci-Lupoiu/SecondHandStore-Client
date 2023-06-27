import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "../../css/Utils.css";
import PostContext from "../../store/manipulate-posts-context";
import FilterPictureModal from "./FilterPictureModal";
import FiltersPopover from "./FiltersPopover";

const FiltersBar = () => {
  const { getAllPosts, getAllPostsByKeywords } = useContext(PostContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openFilterPictureModal, setOpenFilterPictureModal] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchText);
      if (searchText !== undefined) {
        getAllPostsByKeywords?.(searchText);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const open = Boolean(anchorEl);
  return (
    <>
      <Box
        sx={{
          height: "8vh",
          marginTop: "10px",
          border: "2px solid #cccccc",
        }}
      >
        <Toolbar sx={{ marginLeft: "-10px" }}>
          <Button
            className={"filterBarButton"}
            onClick={() => {
              getAllPosts?.({ type: ["îmbrăcăminte"] });
            }}
          >
            Îmbrăcăminte
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: "7.5vh", borderRightWidth: "2px", color: "#cccccc" }}
          />
          <Button
            className={"filterBarButton"}
            onClick={() => {
              getAllPosts?.({ type: ["încălțăminte"] });
            }}
          >
            Încălțăminte
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: "7.5vh", borderRightWidth: "2px", color: "#cccccc" }}
          />
          <Button
            className={"filterBarButton"}
            onClick={() => {
              getAllPosts?.();
            }}
          >
            All
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            id="filterPictureButton"
            size="medium"
            edge="end"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2, textTransform: "none" }}
            onClick={() => {
              setOpenFilterPictureModal(true);
            }}
          >
            <ImageSearchIcon color="primary" sx={{ fontSize: "35px" }} />
          </IconButton>
          <IconButton
            id="filtersButton"
            size="medium"
            edge="end"
            color="primary"
            aria-label="menu"
            sx={{ mr: 5, textTransform: "none" }}
            onClick={handleClick}
          >
            <FilterAltIcon
              color="primary"
              sx={{ marginLeft: "7px", marginRight: "5px", fontSize: "35px" }}
            />
            Filtre
          </IconButton>
          <Popover
            id="filtersButton"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <FiltersPopover handleClose={handleClose} />
          </Popover>
          <TextField
            size="small"
            sx={{
              float: "right",
              minWidth: "300px",
            }}
            InputProps={{
              style: {
                borderColor: theme.palette.primary.main,
              },
            }}
            placeholder="Search..."
            color="primary"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Toolbar>
      </Box>
      {openFilterPictureModal && (
        <FilterPictureModal
          setOpen={setOpenFilterPictureModal}
          open={openFilterPictureModal}
        />
      )}
    </>
  );
};

export default FiltersBar;
