import { API_URL } from "../helpers";
import { useHttp } from "../http-hook/http.hook";
import { useToast } from "../context/toatsContext";

const useBlogService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();
  const blogRoutes = `${API_URL}/blogs`;

  const createBlog = async (formData) => {
    try {
      const res = await request(`${blogRoutes}`, "POST", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });
      handleToast("success", "Blog created successfully");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Failed to create blog");
      throw e;
    }
  };

  const getAllBlogs = async () => {
    try {
      return await request(`${blogRoutes}`);
    } catch (e) {
      handleToast("error", e.message || "Failed to fetch blogs");
      throw e;
    }
  };

  const getBlogById = async (id) => {
    try {
      return await request(`${blogRoutes}/${id}`);
    } catch (e) {
      handleToast("error", e.message || "Blog not found");
      throw e;
    }
  };

  const updateBlog = async (id, formData) => {
    try {
      const res = await request(`${blogRoutes}/${id}`, "PUT", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });
      handleToast("success", "Blog updated successfully");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Failed to update blog");
      throw e;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await request(`${blogRoutes}/${id}`, "DELETE", null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });
      handleToast("success", "Blog deleted successfully");
    } catch (e) {
      handleToast("error", e.message || "Failed to delete blog");
      throw e;
    }
  };

  return {
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
  };
};

export default useBlogService;