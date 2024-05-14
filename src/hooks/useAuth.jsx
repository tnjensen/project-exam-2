import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();

   const login = async (data) => {
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={{login, logout, user}}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.props
}
export const useAuth = () => {
  return useContext(AuthContext);
};