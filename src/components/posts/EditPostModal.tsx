import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Autocomplete, Grid, MenuItem, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { EditPostModalProps } from "../../interfaces/ModalProps";
import PostContext from "../../store/manipulate-posts-context";
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
import {
  convertStringToCondition,
  convertStringToGender,
} from "../../utils/enumConvertions";
import { modalStyle } from "../../utils/modals";

const initalErrorsState = {
  titleErrorText: "",
  descriptionErrorText: "",
  colorErrorText: "",
  priceErrorText: "",
  brandErrorText: "",
  sizeErrorText: "",
  genderErrorText: "",
  conditionErrorText: "",
  styleErrorText: "",
  materialErrorText: "",
  pictureErrorText: "",
  category1ErrorText: "",
  category2ErrorText: "",
  category3ErrorText: "",
};

const EditPostModal: React.FC<EditPostModalProps> = (props) => {
  const { setOpen, open, post } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetFields();
  };

  const theme = useTheme();

  const { modifyPost, savingError } = useContext(PostContext);
  const [title, setTitle] = useState<string>(post.title);
  const [description, setDescription] = useState<string>(post.description);
  const [gender, setGender] = useState<string>(post.gender);
  const [size, setSize] = useState<string>(post.size);
  const [condition, setCondition] = useState<string>(post.condition);
  const [style, setStyle] = useState<string>(post.style);
  // materials- list of strings
  const [material, setMaterial] = useState<string[]>(post.materials);
  const [price, setPrice] = useState<number>(post.price);
  const [brand, setBrand] = useState<string>(post.brand);
  const [color, setColor] = useState<string>(post.color);
  const [category1, setCategory1] = useState<string>(post.category.type);
  const [category2, setCategory2] = useState<string>(post.category.secondType);
  const [category3, setCategory3] = useState<string>(post.category.thirdType);

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

  const [pictureErrorText, setPictureErrorText] = useState("");

  // picture upload logic
  const [picture, setPicture] = useState<File>();

  const [category2Values, setCategory2Values] = useState<string[]>([]);
  const [category3Values, setCategory3Values] = useState<string[]>([]);

  const resetFields = () => {
    //fields
    setTitle(post.title);
    setDescription(post.description);
    setGender(post.gender);
    setSize(post.size);
    setCondition(post.condition);
    setStyle(post.style);
    setMaterial(post.materials);
    setPrice(post.price);
    setBrand(post.brand);
    setColor(post.color);
    setCategory1(post.category.type);
    setCategory2(post.category.secondType);
    setCategory3(post.category.thirdType);
    //errors
    setTitleErrorText("");
    setDescriptionErrorText("");
    setGenderErrorText("");
    setSizeErrorText("");
    setConditionErrorText("");
    setStyleErrorText("");
    setMaterialErrorText("");
    setPriceErrorText("");
    setBrandErrorText("");
    setColorErrorText("");
    setCategory1ErrorText("");
    setCategory2ErrorText("");
    setCategory3ErrorText("");
  };

  useEffect(() => {
    resetFields();
  }, [post]);

  useEffect(() => {
    console.log(post);
    if (category1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCategory2Values(categories.category1[category1].category2);
    }
  }, [category1, category3]);

  useEffect(() => {
    if (category2) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCategory3Values(categories.category1[category1].category3[category2]);
    }
  }, [category1, category2]);

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
      //setCurrentPost({ ...post, picture: e.target.files[0] });
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

    return isValid;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateInput();
    console.log("Valid " + isValid);
    console.log(descriptionErrorText);
    if (!isValid) {
      return;
    }

    const updatePostBody = {
      title,
      description,
      materials: material,
      price: price,
      brand: brand,
      color: color,
      gender: convertStringToGender(gender),
      size: size,
      condition: convertStringToCondition(condition),
      style: style,
      category: {
        type: category1,
        secondType: category2,
        thirdType: category3,
      },
      picture,
    };

    modifyPost?.(post._id, updatePostBody);
    setOpen(false);
    resetFields();
  };

  return (
    <div>
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
            <Typography
              component="h1"
              variant="h4"
              sx={{ marginBottom: "10px" }}
            >
              Edit post
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                    onChange={(
                      event //setTitle(event.target.value)
                    ) => setTitle(event.target.value)}
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
                    onChange={(event) => {
                      setCategory1(event.target.value);
                    }}
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
                    onChange={(event) => {
                      setCategory2(event.target.value);
                    }}
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
                    onChange={(event) => {
                      setCategory3(event.target.value);
                    }}
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
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "20px",
                  bgcolor: theme.palette.secondary.main,
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditPostModal;
