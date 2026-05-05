import { useState } from "react";

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        reject("Not supported");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setLoading(false);
          setError(err.message);
          reject(err);
        },
      );
    });
  };

  return { getCoordinates, loading, error };
};
