import { useEffect, useState } from "react";
type GeolocationType = {
  loaded: boolean;
  coordinates?: { latitude: number; longitude: number };
  error?: any;
};
const useGeoLocation = () => {
  const [location, setLocation] = useState<GeolocationType>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  });

  const onSuccess = (location: any) => {
    console.log(location);
    setLocation({
      loaded: true,
      coordinates: {
        latitude: parseFloat(location.coords.latitude),
        longitude: parseFloat(location.coords.longitude),
      },
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    console.log("Location effect");
    if (!("geolocation" in navigator)) {
      onError({ code: 0, message: "Geolocation not supported" });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};

export default useGeoLocation;
