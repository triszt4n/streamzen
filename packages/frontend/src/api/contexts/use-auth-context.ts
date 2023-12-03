import { useContext } from "react";
import { AuthContextType, AuthContext } from "./auth.context";

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext);
};
