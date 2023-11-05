import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { RenderRoutes } from "../components/structure/RenderRoutes";

const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ userDetails: {}, isAuthenticated: false });

  const decodeJwt = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      if (!token) reject({ message: "Token not found" });
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken.id)
        reject({ message: "JWT Malformed" });
      setUser((user) => ({
        ...user,
        userDetails: decodedToken,
        isAuthenticated: true,
      }));
      resolve({ message: "success" });
    });
  };

  const logout = () => {
    setUser({
      ...user,
      userDetails: {},
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, decodeJwt, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
