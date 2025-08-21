import { useToast } from "../context/toatsContext";
import { api } from "../helpers";
import { useHttp } from "../http-hook/http.hook";

const user = localStorage.getItem("user");

const useRequestService = () => {
  const { handleToast } = useToast();

  const { loadingStatus, setLoadingStatus, request, error, clearError, setProcess, token } =
    useHttp();
  const contactRoutes = `${api}`;


  const sendReq = async (data) => { 
    try {
      const res = await request(`${contactRoutes}/contact`, "POST", JSON.stringify(data));
      handleToast("success", "Thank you! Our agent will contact you shortly.");
    } catch (e) {
      handleToast("error", "Select request type!");
    }
  };

  
  const getHelp = async (data) => { 
    try {
      const res = await request(`${contactRoutes}/help`, "POST", JSON.stringify(data));
      handleToast("success", "Thank you! Our agent will contact you shortly.");
    } catch (e) {
      handleToast("error", "Select request type!");
    }
  };


  return {
    loadingStatus,
    error,
    sendReq,
    getHelp,
    setProcess,
    clearError,
  };
};

export default useRequestService;
