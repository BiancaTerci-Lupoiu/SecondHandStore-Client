import {
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import "../../css/Chips.css";
import { PostFilters } from "../../interfaces/Filters";
import PostContext from "../../store/manipulate-posts-context";
import {
  brands,
  categories,
  colors,
  genders,
  materials,
  sizes,
} from "../../utils/addPostForm";
import CustomAccordion from "./CustomAccordion";

const typeFilters = ["All", "Îmbrăcăminte", "Încălțăminte"];
const genderFilters = ["All", ...genders];
const materialsFilters = ["All", ...materials];
const brandsFilters = ["All", ...brands];
const colorsFilters = ["All", ...colors];
const sizesFilters = ["All", ...sizes];

const defaultState = ["All"];

const FiltersPopover: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const theme = useTheme();

  const [selectedTypeFilters, setSelectedTypeFilters] =
    useState<string[]>(defaultState);
  const [selectedGenderFilters, setSelectedGenderFilters] =
    useState<string[]>(defaultState);
  const [selectedMaterialsFilters, setSelectedMaterialsFilters] =
    useState<string[]>(defaultState);
  const [selectedBrandsFilters, setSelectedBrandsFilters] =
    useState<string[]>(defaultState);
  const [selectedColorsFilters, setSelectedColorsFilters] =
    useState<string[]>(defaultState);
  const [selectedSizesFilters, setSelectedSizesFilters] =
    useState<string[]>(defaultState);
  const [selectedCategoriesFilters, setSelectedCategoriesFilters] =
    useState<string[]>(defaultState);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  // for price
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [priceErrorText, setPriceErrorText] = useState<string>("");

  const { getAllPosts } = useContext(PostContext);

  useEffect(() => {
    if (!selectedTypeFilters.includes("All")) {
      let updatedCategories: string[] = [];
      for (const type of selectedTypeFilters) {
        updatedCategories = [
          ...updatedCategories,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...categories.category1[type.toLowerCase()].category2,
        ];
      }
      setCategoryFilters(updatedCategories);
    } else {
      setCategoryFilters([]);
    }
  }, [selectedTypeFilters]);

  const handleApplyFilters = () => {
    const filters: PostFilters = {};
    if (!selectedTypeFilters.includes("All")) {
      filters.type = selectedTypeFilters;
    }
    if (!selectedGenderFilters.includes("All")) {
      filters.gender = selectedGenderFilters;
    }
    if (!selectedSizesFilters.includes("All")) {
      filters.size = selectedSizesFilters;
    }
    if (!selectedBrandsFilters.includes("All")) {
      filters.brand = selectedBrandsFilters;
    }
    if (!selectedMaterialsFilters.includes("All")) {
      filters.materials = selectedMaterialsFilters;
    }
    if (!selectedColorsFilters.includes("All")) {
      filters.color = selectedColorsFilters;
    }
    if (!selectedCategoriesFilters.includes("All")) {
      filters.secondType = selectedCategoriesFilters;
    }
    if (minPrice && maxPrice && minPrice < maxPrice) {
      filters.minPrice = minPrice;
      filters.maxPrice = maxPrice;
      setPriceErrorText("");
    } else {
      if (minPrice && maxPrice && minPrice > maxPrice) {
        setPriceErrorText("MIN price should be smaller than MAX price!");
        return;
      } else if ((minPrice && !maxPrice) || (maxPrice && !minPrice)) {
        setPriceErrorText("You should provide both MIN and MAX prices!");
        return;
      }
    }

    // apel de getPosts
    getAllPosts?.(filters);
    // await until the fetch is completed
    handleClose();
  };

  const handleFilterClick = (
    newFilter: string,
    typeFilter: string[],
    setTypeFilter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    // check if the newFilter is All, in that case, deselect all the other filters
    if (newFilter === "All") {
      setTypeFilter([newFilter]);
    } else {
      if (typeFilter.includes(newFilter)) {
        if (typeFilter.length === 1) {
          setTypeFilter(defaultState);
        } else {
          setTypeFilter(typeFilter.filter((f) => f !== newFilter));
        }
      } else {
        setTypeFilter([...typeFilter.filter((f) => f !== "All"), newFilter]);
      }
    }
  };

  return (
    <div
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "80vh",
        width: "30vw",
        padding: "2vh",
      }}
    >
      <Typography
        color={theme.palette.secondary.contrastText}
        sx={{ fontWeight: "bold", marginTop: "1vh", marginBottom: "1vh" }}
        variant="h5"
      >
        Tip
      </Typography>
      <Stack direction="row" spacing={1}>
        {typeFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            variant={
              selectedTypeFilters.includes(filter) ? "filled" : "outlined"
            }
            onClick={() =>
              handleFilterClick(
                filter,
                selectedTypeFilters,
                setSelectedTypeFilters
              )
            }
            color={selectedTypeFilters.includes(filter) ? "primary" : "default"}
          />
        ))}
      </Stack>
      {categoryFilters.length !== 0 && (
        <CustomAccordion title="Categorie">
          <Grid container spacing={1}>
            {categoryFilters.map((filter) => (
              <Grid item key={filter}>
                <Chip
                  key={filter}
                  label={filter}
                  variant={
                    selectedCategoriesFilters.includes(filter)
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() =>
                    handleFilterClick(
                      filter,
                      selectedCategoriesFilters,
                      setSelectedCategoriesFilters
                    )
                  }
                  color={
                    selectedCategoriesFilters.includes(filter)
                      ? "primary"
                      : "default"
                  }
                />
              </Grid>
            ))}
          </Grid>
        </CustomAccordion>
      )}
      <Typography
        color={theme.palette.secondary.contrastText}
        sx={{ fontWeight: "bold", marginTop: "1vh", marginBottom: "1vh" }}
        variant="h5"
      >
        Sex
      </Typography>
      <Stack direction="row" spacing={1}>
        {genderFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            variant={
              selectedGenderFilters.includes(filter) ? "filled" : "outlined"
            }
            onClick={() =>
              handleFilterClick(
                filter,
                selectedGenderFilters,
                setSelectedGenderFilters
              )
            }
            color={
              selectedGenderFilters.includes(filter) ? "primary" : "default"
            }
          />
        ))}
      </Stack>
      <CustomAccordion title="Materiale">
        <Grid container spacing={1}>
          {materialsFilters.map((filter) => (
            <Grid item key={filter}>
              <Chip
                key={filter}
                label={filter}
                variant={
                  selectedMaterialsFilters.includes(filter)
                    ? "filled"
                    : "outlined"
                }
                onClick={() =>
                  handleFilterClick(
                    filter,
                    selectedMaterialsFilters,
                    setSelectedMaterialsFilters
                  )
                }
                color={
                  selectedMaterialsFilters.includes(filter)
                    ? "primary"
                    : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
      </CustomAccordion>
      <CustomAccordion title="Branduri">
        <Grid container spacing={1}>
          {brandsFilters.map((filter) => (
            <Grid item key={filter}>
              <Chip
                key={filter}
                label={filter}
                variant={
                  selectedBrandsFilters.includes(filter) ? "filled" : "outlined"
                }
                onClick={() =>
                  handleFilterClick(
                    filter,
                    selectedBrandsFilters,
                    setSelectedBrandsFilters
                  )
                }
                color={
                  selectedBrandsFilters.includes(filter) ? "primary" : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
      </CustomAccordion>
      <CustomAccordion title="Culori">
        <Grid container spacing={1}>
          {colorsFilters.map((filter) => (
            <Grid item key={filter}>
              <Chip
                key={filter}
                label={filter}
                variant={
                  selectedColorsFilters.includes(filter) ? "filled" : "outlined"
                }
                onClick={() =>
                  handleFilterClick(
                    filter,
                    selectedColorsFilters,
                    setSelectedColorsFilters
                  )
                }
                color={
                  selectedColorsFilters.includes(filter) ? "primary" : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
      </CustomAccordion>
      <CustomAccordion title="Mărimi">
        <Grid container spacing={1}>
          {sizesFilters.map((filter) => (
            <Grid item key={filter}>
              <Chip
                key={filter}
                label={filter}
                variant={
                  selectedSizesFilters.includes(filter) ? "filled" : "outlined"
                }
                onClick={() =>
                  handleFilterClick(
                    filter,
                    selectedSizesFilters,
                    setSelectedSizesFilters
                  )
                }
                color={
                  selectedSizesFilters.includes(filter) ? "primary" : "default"
                }
              />
            </Grid>
          ))}
        </Grid>
      </CustomAccordion>
      <Typography
        color={theme.palette.secondary.contrastText}
        sx={{ fontWeight: "bold", marginTop: "1vh", marginBottom: "1vh" }}
        variant="h5"
      >
        Preț
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          display="inline"
          sx={{
            whiteSpace: "no-wrap",
            padding: "0px 8px",
          }}
        >
          De la
        </Typography>
        <TextField
          sx={{ display: "inline" }}
          type="number"
          id="min-price"
          variant="outlined"
          placeholder="MIN"
          onChange={(event) => {
            const result = event.target.value.replace(/\D/g, "");
            setMinPrice(parseInt(result));
          }}
          InputProps={{
            style: { width: "7vw", height: "3vw" },
          }}
          value={minPrice}
        />
        <Typography
          display="inline"
          sx={{
            whiteSpace: "no-wrap",
            padding: "0px 8px",
          }}
        >
          Până la
        </Typography>
        <TextField
          sx={{ display: "inline", width: "20px" }}
          type="number"
          id="max-price"
          variant="outlined"
          placeholder="MAX"
          InputProps={{
            style: { width: "7vw", height: "3vw" },
          }}
          //error={!!priceErrorText}
          //helperText={priceErrorText}
          onChange={(event) => {
            const result = event.target.value.replace(/\D/g, "");
            setMaxPrice(parseInt(result));
          }}
          value={maxPrice}
        />
      </div>
      {priceErrorText && (
        <div style={{ color: "red", textAlign: "center" }}>
          {priceErrorText}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "4vh" }}>
        <Button
          sx={{ fontSize: "16px" }}
          variant="contained"
          onClick={handleApplyFilters}
        >
          Aplică filtre
        </Button>
      </div>
    </div>
  );
};

export default FiltersPopover;
