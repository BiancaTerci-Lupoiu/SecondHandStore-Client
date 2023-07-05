import { Coordinates, Post } from "../interfaces/Post";
import L from "leaflet";

import marker1 from "../assets/location1.svg";
import marker2 from "../assets/location2.svg";
import marker3 from "../assets/location3.svg";
import userMarker from "../assets/userLocation.svg";
interface GroupedPosts {
  coordinates: Coordinates;
  posts: Post[];
}

export const groupPostsByCoordinates = (posts: Post[]): GroupedPosts[] => {
  const groupedPosts: GroupedPosts[] = [];
  console.log("postaraaii ", posts);
  // Iterate through the posts array
  posts.forEach((post) => {
    // Find the index of the groupedPosts array that matches the post's coordinates
    const index = groupedPosts.findIndex(
      (group) =>
        group.coordinates.latitude === post.coordinates.latitude &&
        group.coordinates.longitude === post.coordinates.longitude
    );

    // If a matching group is found, add the post to its posts array
    // Otherwise, create a new group and add the post
    if (index !== -1) {
      console.log("IFFF");
      groupedPosts[index].posts.push(post);
    } else {
      console.log("ELSEEEE");
      groupedPosts.push({
        coordinates: post.coordinates,
        posts: [post],
      });
    }
  });

  return groupedPosts;
};

export const customIcon1 = new L.Icon({
  iconUrl: marker1,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const customIcon2 = new L.Icon({
  iconUrl: marker2,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export const customIcon3 = new L.Icon({
  iconUrl: marker3,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const currentLocationIcon = new L.Icon({
  iconUrl: userMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const getDistance = (coord1: Coordinates, coord2: Coordinates) => {
  const { latitude: lat1, longitude: lon1 } = coord1;
  const { latitude: lat2, longitude: lon2 } = coord2;
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};

export const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const getCorespondentMarkerIcon = (
  userLocation: Coordinates,
  postLocation: Coordinates
) => {
  const distance = getDistance(userLocation, postLocation);
  console.log("Location distance " + distance);
  if (distance < 100) {
    return customIcon1;
  }
  if (distance < 300) {
    return customIcon2;
  }
  return customIcon3;
};
