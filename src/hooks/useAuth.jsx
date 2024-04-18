import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

   const login = async (data) => {
    setUser(data);
    setToken(data.accessToken);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={{login, logout, user,token}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};