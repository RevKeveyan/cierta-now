import { API_URL } from "../helpers";
import { useHttp } from "../http-hook/http.hook";
import { useToast } from "../context/toatsContext";

const useContentService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();
  const contentRoutes = `${API_URL}/content`;

  const addContent = async (formData) => {
    const data = new FormData();
    data.append("type", formData.type);
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("text", formData.text);
    
    // Добавляем serviceType только для сервисов
    if (formData.type === 'service') {
      data.append("serviceType", formData.serviceType);
    }
    
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      const res = await request(`${contentRoutes}`, "POST", data, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      handleToast("success", "Content created successfully");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Failed to create content");
      throw e;
    }
  };

  const updateContent = async (id, formData) => {
    const data = new FormData();
    // Всегда отправляем текущий тип
    data.append("type", formData.type);
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("text", formData.text);
    
    // Добавляем serviceType только для сервисов
    if (formData.type === 'service') {
      data.append("serviceType", formData.serviceType);
    }
    
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      const res = await request(`${contentRoutes}/${id}`, "PUT", data, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      handleToast("success", "Content updated successfully");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Failed to update content");
      throw e;
    }
  };

  const getContentById = async (id) => {
    try {
      return await request(`${contentRoutes}/${id}`);
    } catch (e) {
      handleToast("error", e.message || "Content not found");
      throw e;
    }
  };
  const deleteContent = async (id) => {
    try {
      await request(`${contentRoutes}/${id}`, "DELETE", null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      handleToast("success", "Content deleted successfully");
    } catch (e) {
      handleToast("error", e.message || "Failed to delete content");
      throw e;
    }
  };

  const getContentByType = async (type,setContent) => {
    try {
      const res = await request(`${contentRoutes}?type=${type}`);
      return setContent(res)
    } catch (e) {
      handleToast("error", e.message || "Failed to fetch content");
      throw e;
    }
  };
  return {
    deleteContent,
    updateContent,
    getContentByType,
    addContent,
  };
};

export default useContentService;
