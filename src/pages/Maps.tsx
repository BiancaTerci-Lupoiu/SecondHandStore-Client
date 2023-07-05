import { Avatar, Box, Link, useTheme } from "@mui/material";
import L, { LatLngTuple } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import Legend from "../components/maps/Legend";
import useGeoLocation from "../hooks/useGeolocation";
import PostContext from "../store/manipulate-posts-context";
import { domain } from "../utils/apiCallsHandler";
import {
  currentLocationIcon,
  customIcon1,
  getCorespondentMarkerIcon,
  groupPostsByCoordinates,
} from "../utils/maps";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Maps() {
  const { posts, getAllPosts } = useContext(PostContext);

  const theme = useTheme();

  const location = useGeoLocation();

  console.log(location);

  useEffect(() => {
    getAllPosts?.();
  }, []);

  console.log(posts);

  const groupedPosts = groupPostsByCoordinates(posts);
  console.log(groupedPosts);

  const center: LatLngTuple = [51.505, -0.09];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        marginTop: "15px",
      }}
    >
      <MapContainer
        center={[46.770439, 23.591423]}
        zoom={8}
        style={{ width: "100%", height: "100%", marginTop: "15px" }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {groupedPosts.map((postGroup) => (
          <Marker
            key={postGroup.coordinates.latitude}
            position={[
              postGroup.coordinates.latitude,
              postGroup.coordinates.longitude,
            ]}
            icon={
              location.loaded && !location.error && location.coordinates
                ? getCorespondentMarkerIcon(
                    location.coordinates,
                    postGroup.coordinates
                  )
                : customIcon1
            }
          >
            <Popup>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {postGroup.posts.map((post) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    key={post._id}
                  >
                    <Avatar
                      variant="square"
                      alt="Remy Sharp"
                      src={`${domain}/images/posts/${post.picture}`}
                      sx={{
                        boxShadow: `${theme.shadows[10]}`,
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: "5px",
                      }}
                    />
                    <Link
                      href={`/posts/${post._id}`}
                      underline="hover"
                      variant="subtitle1"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {post.title}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Popup>
          </Marker>
        ))}
        {location.loaded && !location.error && location.coordinates && (
          <Marker
            key={"user_marker"}
            position={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
            icon={currentLocationIcon}
          >
            <Tooltip direction="right" offset={[5, -20]} opacity={1} permanent>
              Your location
            </Tooltip>
          </Marker>
        )}

        {/* <LayersControl position="bottomleft">
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
        </LayersControl> */}
        <Legend />
      </MapContainer>
    </Box>
  );
}
