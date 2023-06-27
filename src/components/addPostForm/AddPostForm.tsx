import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import {
  brands,
  categories,
  colors,
  conditions,
  genders,
  materials,
  sizes,
  styles,
} from "../../utils/addPostForm";

import { Condition } from "../../interfaces/Post";
import AddPostContext from "../../store/add-post-context";
import {
  convertStringToCondition,
  convertStringToGender,
} from "../../utils/enumConvertions";

const AddPostForm: React.FC<{
  handleNext: () => void;
}> = ({ handleNext }) => {
  const { updatePostDetails, postDetails } = useContext(AddPostContext);

  //console.log("condition " + postDetails?.category.thirdType);
  console.log(postDetails);
  const [title, setTitle] = useState<string>(
    postDetails && postDetails.title ? postDetails.title : ""
  );
  const [description, setDescription] = useState<string>(
    postDetails && postDetails.description ? postDetails.description : ""
  );
  const [gender, setGender] = useState<string>(
    postDetails && postDetails.gender ? postDetails.gender : ""
  );
  const [size, setSize] = useState<string>(
    postDetails && postDetails.size ? postDetails.size : ""
  );
  const [condition, setCondition] = useState<string>(
    postDetails && postDetails.condition
      ? postDetails.condition
      : Condition.DEFAULT
  );
  const [style, setStyle] = useState<string>(
    postDetails && postDetails.style ? postDetails.style : ""
  );
  // materials- list of strings
  const [material, setMaterial] = useState<string[]>(
    postDetails && postDetails.materials ? postDetails.materials : []
  );
  const [price, setPrice] = useState<number>(
    postDetails && postDetails.price ? postDetails.price : 0
  );
  const [brand, setBrand] = useState<string>(
    postDetails && postDetails.brand ? postDetails.brand : ""
  );
  const [color, setColor] = useState<string>(
    postDetails && postDetails.color ? postDetails.color : ""
  );
  // picture upload logic
  const [picture, setPicture] = useState<File | null>(
    postDetails && postDetails.picture ? postDetails.picture : null
  );
  const [category1, setCategory1] = useState<string>(
    postDetails && postDetails.category.type ? postDetails.category.type : ""
  );
  const [category2, setCategory2] = useState<string>(
    postDetails && postDetails.category.secondType
      ? postDetails.category.secondType
      : ""
  );
  const [category3, setCategory3] = useState<string>(
    postDetails && postDetails.category.thirdType
      ? postDetails.category.thirdType
      : ""
  );

  const [titleErrorText, setTitleErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [genderErrorText, setGenderErrorText] = useState("");
  const [sizeErrorText, setSizeErrorText] = useState("");
  const [conditionErrorText, setConditionErrorText] = useState("");
  const [styleErrorText, setStyleErrorText] = useState("");
  const [materialErrorText, setMaterialErrorText] = useState("");
  const [priceErrorText, setPriceErrorText] = useState("");
  const [brandErrorText, setBrandErrorText] = useState("");
  const [colorErrorText, setColorErrorText] = useState("");
  const [category1ErrorText, setCategory1ErrorText] = useState("");
  const [category2ErrorText, setCategory2ErrorText] = useState("");
  const [category3ErrorText, setCategory3ErrorText] = useState("");

  const [category2Values, setCategory2Values] = useState<string[]>([]);
  const [category3Values, setCategory3Values] = useState<string[]>([]);

  const [pictureErrorText, setPictureErrorText] = useState("");

  const theme = useTheme();

  useEffect(() => {
    if (category1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCategory2Values(categories.category1[category1].category2);
      console.log("HEREEE");
      if (postDetails?.category.type !== category1) setCategory3("");
    }
  }, [category1]);

  useEffect(() => {
    if (category2) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCategory3Values(categories.category1[category1].category3[category2]);
    }
  }, [category2]);

  const handleMaterialsChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setMaterial(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFile = (e: any) => {
    if (
      e.target.files &&
      (e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg")
    ) {
      setPicture(e.target.files[0]);
    }
  };

  function validateInput() {
    let isValid = true;
    if (!title) {
      setTitleErrorText("Title required!");
      isValid = false;
    } else {
      setTitleErrorText("");
    }
    if (!gender) {
      setGenderErrorText("Gender required");
      isValid = false;
    } else {
      setGenderErrorText("");
    }
    if (!description) {
      setDescriptionErrorText("Description required");
      isValid = false;
    } else {
      setDescriptionErrorText("");
    }
    if (!size) {
      setSizeErrorText("Size required");
      isValid = false;
    } else {
      setSizeErrorText("");
    }
    if (!condition) {
      setConditionErrorText("Condition required");
      isValid = false;
    } else {
      setConditionErrorText("");
    }
    if (!style) {
      setStyleErrorText("Style required");
      isValid = false;
    } else {
      setStyleErrorText("");
    }
    if (!material || material.length === 0) {
      setMaterialErrorText("Materials required");
      isValid = false;
    } else {
      setMaterialErrorText("");
    }
    if (!price) {
      setPriceErrorText("Price required");
      isValid = false;
    } else {
      if (price <= 0) {
        setPriceErrorText("Invalid price");
        isValid = false;
      } else {
        setPriceErrorText("");
      }
    }
    if (!brand) {
      setBrandErrorText("Brand required");
      isValid = false;
    } else {
      setBrandErrorText("");
    }
    if (!color) {
      setColorErrorText("Color required");
      isValid = false;
    } else {
      setColorErrorText("");
    }
    if (!category1) {
      setCategory1ErrorText("Category1 required");
      isValid = false;
    } else {
      setCategory1ErrorText("");
    }
    if (!category2) {
      setCategory2ErrorText("Category2 required");
      isValid = false;
    } else {
      setCategory2ErrorText("");
    }
    if (!category3) {
      setCategory3ErrorText("Category3 required");
      isValid = false;
    } else {
      setCategory3ErrorText("");
    }
    if (!picture) {
      setPictureErrorText("Picture required!");
      isValid = false;
    } else {
      setPictureErrorText("");
    }

    return isValid;
  }

  const handleClickNext = () => {
    //uploadPostPicture(picture!, "asd", "");
    const isInputValid = validateInput();
    //const isInputValid = true;

    if (isInputValid) {
      if (picture) {
        updatePostDetails?.({
          title,
          description,
          materials: material,
          price,
          brand,
          color,
          gender: convertStringToGender(gender),
          size,
          condition: convertStringToCondition(condition),
          style,
          category: {
            type: category1,
            secondType: category2,
            thirdType: category3,
          },
          picture,
        });
      }
      handleNext();
    }
  };

  return (
    <Container component="div" maxWidth="sm" sx={{ height: "auto" }}>
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Item details
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleClickNext}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                label="Titlu"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                error={!!titleErrorText}
                helperText={titleErrorText}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                autoComplete="gender"
                name="gender"
                required
                fullWidth
                id="gender"
                label="Sex"
                autoFocus
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                error={!!genderErrorText}
                helperText={genderErrorText}
              >
                {genders.map((genderText) => (
                  <MenuItem key={genderText} value={genderText}>
                    {genderText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Autocomplete
                freeSolo
                options={sizes}
                inputValue={size}
                onChange={(event, value) => {
                  setSize(value!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    id="size"
                    label="Mărime"
                    name="size"
                    autoComplete="size"
                    value={size}
                    error={!!sizeErrorText}
                    helperText={sizeErrorText}
                    onChange={(event) => setSize(event.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={2}
                id="description"
                label="Descriere"
                name="description"
                value={description}
                autoComplete="description"
                onChange={(event) => setDescription(event.target.value)}
                error={!!descriptionErrorText}
                helperText={descriptionErrorText}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                name="condition"
                label="Condiție"
                type="condition"
                id="condition"
                autoComplete="condition"
                value={condition}
                onChange={(event) => {
                  console.log(event);
                  setCondition(event.target.value);
                }}
                error={!!conditionErrorText}
                helperText={conditionErrorText}
              >
                {conditions.map((conditionText) => (
                  <MenuItem key={conditionText} value={conditionText}>
                    {conditionText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                name="style"
                label="Stil"
                type="style"
                id="style"
                autoComplete="style"
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                error={!!styleErrorText}
                helperText={styleErrorText}
              >
                {styles.map((styleText) => (
                  <MenuItem key={styleText} value={styleText}>
                    {styleText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                name="brand"
                label="Brand"
                type="brand"
                id="brand"
                autoComplete="brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                error={!!brandErrorText}
                helperText={brandErrorText}
              >
                {brands.map((brandText) => (
                  <MenuItem key={brandText} value={brandText}>
                    {brandText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="price"
                label="Preț"
                type="number"
                id="price"
                autoComplete="price"
                value={price}
                onChange={(event) =>
                  setPrice(
                    event.target.value ? parseInt(event.target.value) : 0
                  )
                }
                error={!!priceErrorText}
                helperText={priceErrorText}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                freeSolo
                options={colors}
                inputValue={color}
                onChange={(event, value) => {
                  setColor(value!);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    id="color"
                    label="Culoare"
                    name="color"
                    autoComplete="color"
                    onChange={(event) => setColor(event.target.value)}
                    error={!!colorErrorText}
                    helperText={colorErrorText}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                SelectProps={{
                  multiple: true,
                  onChange: handleMaterialsChange,
                  defaultValue: [],
                }}
                required
                fullWidth
                id="materials"
                label="Materiale"
                name="materials"
                autoComplete="materials"
                value={material}
                error={!!materialErrorText}
                helperText={materialErrorText}
              >
                {materials.map((materialText) => (
                  <MenuItem key={materialText} value={materialText}>
                    {materialText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                select
                id="categorie1"
                label="Categorie 1"
                name="categorie1"
                autoComplete="categorie1"
                value={category1}
                onChange={(event) => setCategory1(event.target.value)}
                error={!!category1ErrorText}
                helperText={category1ErrorText}
              >
                {Object.keys(categories.category1).map((categoryText) => (
                  <MenuItem key={categoryText} value={categoryText}>
                    {categoryText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                select
                id="categorie2"
                label="Categorie 2"
                name="categorie2"
                autoComplete="categorie2"
                value={category2}
                onChange={(event) => setCategory2(event.target.value)}
                error={!!category2ErrorText}
                helperText={category2ErrorText}
              >
                {category2Values.map((categoryText) => (
                  <MenuItem key={categoryText} value={categoryText}>
                    {categoryText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                select
                id="categorie3"
                label="Categorie 3"
                name="categorie3"
                autoComplete="categorie3"
                value={category3}
                onChange={(event) => setCategory3(event.target.value)}
                error={!!category3ErrorText}
                helperText={category3ErrorText}
              >
                {category3Values.map((categoryText) => (
                  <MenuItem key={categoryText} value={categoryText}>
                    {categoryText}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={8}>
              {" "}
              {picture && (
                <Typography component="h4">{picture.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                id="raised-button-file"
                onChange={handleFile}
                type="file"
              />
              {pictureErrorText && (
                <Typography component="h5" color="red">
                  {pictureErrorText}
                </Typography>
              )}
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ background: theme.palette.secondary.main }}
                >
                  <AddPhotoAlternateIcon />
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              width: "20px",
              bgcolor: theme.palette.secondary.main,
            }}
            onClick={handleClickNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddPostForm;
