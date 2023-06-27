import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "../assets/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSpring, animated, config } from "@react-spring/web";

const AnimatedCard = animated(Card);

const AboutPage = () => {
  const theme = useTheme();

  const leftCardAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: config.slow,
  });

  const rightCardAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0%)" },
    config: config.slow,
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "13vh",
        overflow: "hidden",
      }}
    >
      <AnimatedCard
        sx={{
          width: "26vw",
          height: "50vh",
          backgroundColor: theme.palette.secondary.light,
          display: "flex",
          justifyContent: "space-between",
        }}
        style={leftCardAnimation}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" gutterBottom>
            <b>SecondLife</b> -
            <Typography sx={{ fontStyle: "italic" }} variant="h4">
              Îmbrățișează sustenabilitatea și reînvie frumusețea hainelor
              second-hand
            </Typography>
          </Typography>
          <Typography
            sx={{ textAlign: "center", fontSize: "22px", fontWeight: 700 }}
            gutterBottom
          >
            Pas cu pas, împreună putem face o schimbare!
          </Typography>
        </CardContent>
      </AnimatedCard>
      <Box
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          width: "40vw",
        }}
      />
      <AnimatedCard
        sx={{
          width: "26vw",
          height: "50vh",
          backgroundColor: theme.palette.secondary.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        style={rightCardAnimation}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10px",
            width: "100%",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
            variant="h4"
            gutterBottom
          >
            Informații de contact:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "5px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                Email:
                <span
                  style={{
                    fontSize: "16px",
                    fontStyle: "italic",
                    fontWeight: "400",
                  }}
                >
                  {"   onlinesh1234@gmail.com"}
                </span>
              </Typography>
            </div>
            <Divider
              variant="fullWidth"
              sx={{
                backgroundColor: theme.palette.primary.light,
                width: "85%",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                Telefon:
                <span
                  style={{
                    fontSize: "16px",
                    fontStyle: "italic",
                    fontWeight: "400",
                  }}
                >
                  {"   0754456565"}
                </span>
              </Typography>
            </div>
            <Divider
              variant="fullWidth"
              sx={{
                backgroundColor: theme.palette.primary.light,
                width: "85%",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                Adresă:
                <span
                  style={{
                    fontSize: "16px",
                    fontStyle: "italic",
                    fontWeight: "400",
                  }}
                >
                  {"   Calea București 25, Brașov"}
                </span>
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              height: "10vh",
              gap: "7px",
              marginRight: "20px",
            }}
          >
            <FacebookIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
          </Box>
        </CardContent>
      </AnimatedCard>
    </Box>
  );
};

export default AboutPage;
