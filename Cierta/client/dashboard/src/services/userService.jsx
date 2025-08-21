// services/userService.js

import { useToast } from "../context/toatsContext";
import { API_URL } from "../helpers";
import { useHttp } from "../http-hook/http.hook";

const useUserService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();

  const registerUser = async (userData) => {
    try {
      const res = await request(`${API_URL}/auth/register`, "POST", JSON.stringify(userData));
      handleToast("success", "User created successfully");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Error creating user");
      throw e;
    }
  };

  const getAllUsers = async () => {
    try {
      return await request(`${API_URL}/auth/users`, "GET");

    } catch (e) {
      handleToast("error", e.message || "Error loading users");
      throw e;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await request(`${API_URL}/auth/users/${userId}`, "DELETE");
      handleToast("success", "User deleted");
    } catch (e) {
      handleToast("error", e.message || "Error deleting");
      throw e;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const res = await request(`${API_URL}/auth/users/${userId}`, "PUT", JSON.stringify(userData));
      handleToast("success", "Changes saved");

      return res;
    } catch (e) {
      handleToast("error", e.message || "Update error");
      throw e;
    }
  };

  return {
    registerUser,
    deleteUser,
    getAllUsers,
    updateUser,
    error,
    clearError
  };
};

export default useUserService;