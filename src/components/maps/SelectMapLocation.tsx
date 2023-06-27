import React, { useEffect, Component, useState, useContext } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import AddPostContext from "../../store/add-post-context";
import marker from "../../assets/location1.svg";

var customIcon = new L.Icon({
  iconUrl:
    //"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    marker,
  // shadowUrl:
  //   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const initialPosition: LatLngTuple = [46.770439, 23.591423];

const CustomMarker = () => {
  const [position, setPosition] = useState(initialPosition);
  const { updatePostDetails, postDetails } = useContext(AddPostContext);

  if (!postDetails?.coordinates) {
    updatePostDetails?.({
      ...postDetails!,
      coordinates: { latitude: position[0], longitude: position[1] },
    });
  }

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      updatePostDetails?.({
        ...postDetails!,
        coordinates: { latitude: position[0], longitude: position[1] },
      });
    },
  });

  return <Marker position={position} icon={customIcon} />;
};

export default function SelectMapLocation() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "50vw",
        height: "40vh",
        border: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <MapContainer
        center={[46.770439, 23.591423]}
        zoom={8}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <CustomMarker />
      </MapContainer>
    </Box>
  );
}