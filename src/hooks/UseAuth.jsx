import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";

const useAuth = () => {
  const useAuth = useContext(authContext);
  return useAuth;
};

export default useAuth;
