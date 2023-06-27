import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  border: "0px",
  borderStyle: "none",
  padding: "0px",
  margin: "0px",
  "&::before": {
    display: "none",
  },
  "& .Mui-expanded": {
    padding: "0px",
    margin: "0px",
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root": {
    height: "42px",
  },

  backgroundColor: "transparent",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  fontWeight: "bold",
  padding: "0px",
  margin: "0px",
  minHeight: "auto",
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "0px",
  display: "block",
  margin: "0px",
  height: "auto",
}));

const CustomAccordion: React.FC<AccordionItemProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          color={theme.palette.secondary.contrastText}
          sx={{ fontWeight: "bold", marginTop: "1vh", marginBottom: "1vh" }}
          variant="h5"
        >
          {title}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default CustomAccordion;
