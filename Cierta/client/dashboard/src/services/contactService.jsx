// services/content/contactservice.js
import { useToast } from "../context/toatsContext";
import { API_URL } from "../helpers";
import { useHttp } from "../http-hook/http.hook";

const useContactService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();

  const createContact = async (formData) => {
    try {
      const res = await request(`${API_URL}/content/contacts`, "POST", JSON.stringify(formData));
      handleToast("success", "Contact created");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Error creating contact");
      throw e;
    }
  };

  const getContacts = async () => {
    try {
      return await request(`${API_URL}/content/contacts`, "GET");
    } catch (e) {
      handleToast("error", e.message || "Error loading contacts");
      throw e;
    }
  };

  const updateContact = async (id, formData) => {
    try {
      const res = await request(`${API_URL}/content/contacts/${id}`, "PUT", JSON.stringify(formData));
      handleToast("success", "Contact updated");
      return res;
    } catch (e) {
      handleToast("error", e.message || "Contact update error");
      throw e;
    }
  };

  const deleteContact = async (id) => {
    try {
      await request(`${API_URL}/content/contacts/${id}`, "DELETE");
      handleToast("success", "Contact deleted");
    } catch (e) {
      handleToast("error", e.message || "Error deleting contact");
      throw e;
    }
  };

  return {
    createContact,
    getContacts,
    updateContact,
    deleteContact,
    error,
    clearError
  };
};

export default useContactService;