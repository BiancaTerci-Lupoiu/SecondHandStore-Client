import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { modalStyle } from "../../utils/modals";
import Backdrop from "@mui/material/Backdrop";
import {
  BasicModalProps,
  DeletePostModalProps,
} from "../../interfaces/ModalProps";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import PostContext from "../../store/manipulate-posts-context";
import PictureUploader from "./PictureUploader";

const FilterPictureModal: React.FC<BasicModalProps> = (props) => {
  const { setOpen, open } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const { getPostsByPicture } = useContext(PostContext);

  const theme = useTheme();

  const { removePost } = useContext(PostContext);

  const handleSearchByPicture = async (picture: File) => {
    getPostsByPicture?.(picture);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <PictureUploader onSearch={handleSearchByPicture} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FilterPictureModal;
