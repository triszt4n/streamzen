import Cookies from "js-cookie";
import { createContext, PropsWithChildren, useState } from "react";
import { useQuery } from "react-query";
import { User, UserApi } from "../user.api";
import { CookieKeys } from "./cookie-keys";

export type AuthContextType = {
  isLoggedIn: boolean;
  loggedInUser: User | undefined;
  loggedInUserLoading: boolean;
  loggedInUserError: unknown;
  loginPath: string;
  onLoginSuccess: (jwt: string) => void;
  onLogout: (path?: string) => void;
  refetchUser: () => Promise<unknown>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: undefined,
  loggedInUserLoading: false,
  loggedInUserError: undefined,
  loginPath: "",
  onLoginSuccess: () => {},
  onLogout: () => {},
  refetchUser: async () => ({}),
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    typeof Cookies.get(CookieKeys.BSSTREAMING_JWT_TOKEN) !== "undefined",
  );
  const {
    isLoading,
    data: user,
    error,
    refetch,
  } = useQuery("currentUser", UserApi.getInstance().fetchCurrentUser, {
    enabled: isLoggedIn,
    retry: false,
    onSuccess: (data) => {
      if (data.jwt) {
        Cookies.set(CookieKeys.BSSTREAMING_JWT_TOKEN, data.jwt, { expires: 2 });
      }
    },
  });

  const onLoginSuccess = (jwt: string) => {
    Cookies.set(CookieKeys.BSSTREAMING_JWT_TOKEN, jwt, { expires: 2 });
    setIsLoggedIn(true);
    refetch();
  };

  const onLogout = () => {
    Cookies.remove(CookieKeys.BSSTREAMING_JWT_TOKEN);
    setIsLoggedIn(false);
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUserLoading: isLoading,
        loggedInUser: user,
        loggedInUserError: error,
        loginPath: `/api/auth/login`,
        onLoginSuccess,
        onLogout,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
