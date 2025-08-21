// context/userContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      localStorage.setItem("id", res.data._id);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      // localStorage.clear();
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

 

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };