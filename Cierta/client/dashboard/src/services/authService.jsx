// services/authService.js

import { useToast } from "../context/toatsContext";
import { API_URL } from "../helpers";
import { useHttp } from "../http-hook/http.hook";

const useAuthService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();

  const loginUser = async (credentials) => {
    try {
      const res = await request(`${API_URL}/auth/login`, "POST", JSON.stringify(credentials));
      handleToast("success", "Welcome back!");
      localStorage.setItem("id", JSON.stringify(res.user.id));
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      return res;
    } catch (e) {
      handleToast("error", e.message || "Error");
      throw e;
    }
  };

  const getProfile = async () => {
    try {
      return await request(`${API_URL}/auth/profile`, "GET");
    } catch (e) {
      handleToast("error", e.message || "Error");
      throw e;
    }
  };

  return {
    loginUser,
    getProfile,
    error,
    clearError
  };
};

export default useAuthService;