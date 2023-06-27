import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { BasicModalProps } from "../interfaces/ModalProps";

const LoadingComponent: React.FC<BasicModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            border: "0px white",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 10,
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Loading
          </Typography>
          <CircularProgress />
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoadingComponent;
