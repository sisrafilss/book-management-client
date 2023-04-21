import { useContext } from "react";
import { AuthContext } from "../components/contexts/AuthProvider/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
