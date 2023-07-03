import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Post } from "../../interfaces/Post";
import { domain } from "../../utils/apiCallsHandler";
const ItemCard: React.FC<{ post: Post }> = ({ post }) => {
  console.log(post._id);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/posts/${post._id}`);
  };
  const theme = useTheme();
  return (
    <>
      <Card
        sx={{
          height: 350,
          width: 370,
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 54px 55px, rgba(0, 0, 0, 0.10) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.07) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
        onClick={handleCardClick}
      >
        <CardHeader
          avatar={
            (post.user.picture && (
              <Avatar src={`${domain}/images/users/${post.user.picture}`} />
            )) || (
              <Avatar> {post.user.firstName[0] + post.user.lastName[0]}</Avatar>
            )
          }
          title={post.user.firstName + " " + post.user.lastName}
          titleTypographyProps={{ fontSize: "16px" }}
          subheader={
            post.user.address?.locality + ", " + post.user.address?.city
          }
        />
        <CardMedia
          sx={{
            height: 210,
            objectFit: "contain",
          }}
          image={`${domain}/images/posts/${post.picture}`}
          title="Background image"
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {post.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "-50px", marginLeft: "300px" }}>
          <Button>
            <ShoppingCartIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
        </CardActions>
      </Card>
      {post.percentage && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Typography variant="h5">
            <strong>Procentaj similitudine: </strong>
            {post.percentage.toFixed(3)}%
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ItemCard;
