import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Avatar, useTheme } from "@mui/material";

const ShopIcon = () => {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        m: 1,
        bgcolor: theme.palette.primary.contrastText,
        width: 70,
        height: 70,
        border: "2px solid " + theme.palette.secondary.main,
      }}
    >
      <LocalMallIcon
        sx={{
          width: 40,
          height: 40,
          color: theme.palette.secondary.main,
        }}
      />
    </Avatar>
  );
};

export default ShopIcon;
