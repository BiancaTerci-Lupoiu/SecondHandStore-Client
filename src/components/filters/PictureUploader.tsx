import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { Button, IconButton, Paper, Typography, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const PicturePreview = styled(Paper)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
  //display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
});

interface PictureUploaderProps {
  onSearch: (file: File) => void;
}

function PictureUploader({ onSearch }: PictureUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const theme = useTheme();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
    }
  };

  const handleFilterByPicture = () => {
    if (picture) {
      onSearch(picture);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        height: "50vh",
      }}
    >
      <input
        accept="image/*"
        style={{
          display: "none",
        }}
        id="picture-upload-input"
        onChange={handleImageUpload}
        type="file"
      />

      <PicturePreview>
        <Typography
          variant="h5"
          align="left"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Încarcă o fotografie și caută produse asemănătoare
        </Typography>
        {previewUrl && (
          <>
            <img
              src={previewUrl}
              style={{
                height: "60%",
                maxWidth: "80%",
                objectFit: "contain",
                border: `3px solid ${theme.palette.secondary.main}`,
                borderRadius: "8px",
              }}
            />
            <div style={{ textAlign: "center", marginTop: "4vh" }}>
              <Button
                sx={{
                  fontSize: "16px",
                  backgroundColor: theme.palette.secondary.main,
                }}
                variant="contained"
                onClick={handleFilterByPicture}
              >
                Caută
              </Button>
            </div>
          </>
        )}
        {!previewUrl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "80%",
                backgroundColor: "#cccccc",
                border: `3px solid ${theme.palette.secondary.main}`,
                borderRadius: "8px",
              }}
            >
              <label htmlFor="picture-upload-input">
                <IconButton
                  onClick={() =>
                    document.getElementById("picture-upload-input")?.click()
                  }
                >
                  <AddAPhoto fontSize="large" />
                </IconButton>
                <Typography variant="subtitle1">Încarcă o imagine</Typography>
              </label>
            </div>
          </div>
        )}
      </PicturePreview>
    </div>
  );
}

export default PictureUploader;
