import axios from "axios";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-five-liart.vercel.app",
  withCredentials: true,
});

export default function UseAxiosSecure() {
  const { signOutUser } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          signOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }, []);

  return axiosInstance;
}
