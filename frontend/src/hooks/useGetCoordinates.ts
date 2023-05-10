import { useState } from "react";

function useGetCoordinates() {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [error, setError] = useState("");
  const geolocationAPI = navigator.geolocation;
  if (!geolocationAPI) {
    setError("Geolocation API is not available in your browser!");
  } else {
    geolocationAPI.getCurrentPosition(
      (position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      },
      (error) => {
        setError("Something went wrong while getting your position!");
      }
    );
  }

  return { long, lat, error };
}

export default useGetCoordinates;
