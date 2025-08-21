import { useHttp } from "../http-hook/http.hook";
import { API_URL } from "../helpers";

const removeEmptyValues = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const result = Array.isArray(obj) ? [] : {};
  
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    
    if (value !== null && value !== undefined && value !== '') {
      result[key] = typeof value === 'object' 
        ? removeEmptyValues(value) 
        : value;
    }
  });
  
  return result;
};
const useLoadService = () => {
  const { request } = useHttp();

  const searchLoads = async (vin) => {
    try {
      const res = await request(`${API_URL}/loads?vin=${vin}`);
      return res;
    } catch (e) {
      throw new Error(e.message || "Failed to search loads");
    }
  };

  const createLoad = async (loadData, images,carrierImageFile) => {
    try {
       const cleanedData = removeEmptyValues(loadData); 
      const formData = new FormData();
      formData.append('data', JSON.stringify(cleanedData));
      
    images &&  images.forEach(file => {
        formData.append('images', file);
      });
         carrierImageFile.forEach(file => {
        formData.append('carrierImageFile', file);
      });
      return await request(`${API_URL}/loads`, "POST", formData, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
    } catch (e) {
      throw new Error(e.message || "Failed to create load");
    }
  };
  
  const getAllLoads = async (page = 1, limit = 10, companyName="cierta") => {
  try {
    return await request(`${API_URL}/loads/all?page=${page}&limit=${limit}&companyName=${companyName}`, "GET");
  } catch (e) {
    throw new Error(e.message || "Failed to get all loads");
  }
};

// Измененная функция updateLoad
const updateLoad = async (updates, images = [], carrierImageFile = [], removedVehicleImages = [], removedCarrierImages = []) => {
  try {
    const cleanedData = removeEmptyValues({
      ...updates,
      removedVehicleImages,
      removedCarrierImages
    });

    const formData = new FormData();
    formData.append('data', JSON.stringify(cleanedData));
    
    images && images.forEach(file => {
      formData.append('images', file);
    });
    
    carrierImageFile && carrierImageFile.forEach(file => {
      formData.append('carrierImageFile', file);
    });

    return await request(
      `${API_URL}/loads/${updates._id}`, 
      "PUT",
      formData,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};

  const deleteLoad = async (id) => {
    try {
      return await request(
        `${API_URL}/loads/${id}`, 
        "DELETE",
        null,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
    } catch (e) {
      throw new Error(e.message || "Failed to delete load");
    }
  };

  return { searchLoads, createLoad, updateLoad, deleteLoad, getAllLoads };
};

export default useLoadService;