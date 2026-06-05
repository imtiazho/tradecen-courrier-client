import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        // Log the detailed error to the console (backend/frontend console)
        console.error("API Error:", error);
        
        // Return a generic error message for the UI
        return Promise.reject(new Error("Internal Server Error"));
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
