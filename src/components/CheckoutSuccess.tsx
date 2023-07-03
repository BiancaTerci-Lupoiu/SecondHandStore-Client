import { Box, IconButton, Typography } from "@mui/material";

const CheckoutSuccess = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Plata efectuată cu succes!
      </Typography>
      <Box>
        <IconButton
          size="medium"
          edge="end"
          aria-label="menu"
          href="/main"
          style={{
            padding: "8px 30px",
            borderRadius: "30px",
            width: "fit-content",
          }}
        >
          Apasă aici ca să revii la pagina principală
        </IconButton>
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;
