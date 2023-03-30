import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Post } from "../interfaces/Post";
import { domain } from "../utils/apiCallsHandler";
import { useNavigate } from "react-router";
const ItemCard: React.FC<{ post: Post }> = ({ post }) => {
  console.log(post._id);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${post._id}`);
  };
  return (
    <Card sx={{ height: 350, width: 370 }} onClick={handleCardClick}>
      <CardHeader
        // de pus imaginea de la user
        // TO BE COMPLETED
        avatar={
          (post.user.picture && (
            <Avatar src={`${domain}/images/users/${post.user.picture}`} />
          )) || (
            <Avatar> {post.user.firstName[0] + post.user.lastName[0]}</Avatar>
          )
        }
        title={post.user.firstName + " " + post.user.lastName}
        titleTypographyProps={{ fontSize: "16px" }}
        subheader={post.user.address?.locality + ", " + post.user.address?.city}
        // action={
        //   <IconButton>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
      />
      <CardMedia
        sx={{
          //paddingTop: "50%",
          height: 210,

          objectFit: "contain",
        }}
        // de pus imaginea din postare
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
  );
};

export default ItemCard;
