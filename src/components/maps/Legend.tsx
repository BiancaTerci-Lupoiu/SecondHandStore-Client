import { Box } from "@mui/material";

const Legend = () => {
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: "absolute",
        bottom: "20px",
        left: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: "#ffff00",
            border: "1px solid black",
          }}
        ></div>
        Your location
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: "#651fff",
            border: "1px solid black",
          }}
        ></div>
        {"< 100 km"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: "#9666ff",
            border: "1px solid black",
          }}
        ></div>
        {"< 300 km"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: "#cbb3ff",
            border: "1px solid black",
          }}
        ></div>
        {">= 300 km"}
      </div>
    </Box>
  );
};

export default Legend;
