import { useState, useContext, useEffect, createContext } from "react";

export const AuthContext = createContext({});

function useAuth() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  return { token, setToken };
}

export const useAuthContext = () => useContext(AuthContext);

export { useAuth };
