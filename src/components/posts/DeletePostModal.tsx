import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { modalStyle } from "../../utils/modals";
import Backdrop from "@mui/material/Backdrop";
import { DeletePostModalProps } from "../../interfaces/ModalProps";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import PostContext from "../../store/manipulate-posts-context";
const DeletePostModal: React.FC<DeletePostModalProps> = (props) => {
  const { setOpen, open, postId } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const { removePost, savingError } = useContext(PostContext);

  const handleDeletePost = async () => {
    await removePost?.(postId);
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
            <Typography
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
              variant="h4"
              component="h4"
            >
              Are you sure you want to delete this post?
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginRight: "8px",
                bgcolor: theme.palette.secondary.main,
              }}
              onClick={handleDeletePost}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{
                marginLeft: "8px",
                bgcolor: theme.palette.secondary.main,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeletePostModal;
