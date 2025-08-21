import { api } from "../helpers";
import { useHttp } from "../http-hook/http.hook";

const useContentService = () => {
  const { request } = useHttp();

  const getAllBlogs = async (page = 1, limit = 5, setPagination) => {
    try {
      const res = await request(
        `${api}/blogs?page=${page}&limit=${limit}`,
        "GET"
      );
      setPagination((prev) => ({
        ...prev,
        blogs: res.blogs,
        totalPages: res.pagination.totalPages,
        currentPage: res.pagination.currentPage,
      }));
      // setPagination(res)
    } catch (e) {
      throw new Error(e.message || "Failed to fetch blogs");
    }
  };
  const getNewestBlog = async (setBlog) => {
    try {
      const res = await request(`${api}/blogs/newest/:id`, "GET");
      setBlog(res);
    } catch (e) {
      throw new Error(e.message || "Failed to fetch newest blog");
    }
  };
  const getBlogById = async (id) => {
    try {
      const res = await request(`${api}/blogs/${id}`, "GET");
      return res;
    } catch (e) {
      throw new Error(e.message || "Failed to fetch blog");
    }
  };

  const getContentByType = async (type, setContent) => {
    try {
      const res = await request(`${api}/content?type=${type}`, "GET");
      setContent(res);
      localStorage.setItem("token", res.token);
    } catch (e) {}
  };

  const getPolicySections = async (pageType, setContent, setLoading) => {
    try {
      const res = await request(`${api}/policies?pageType=${pageType}`, "GET");
      setContent(res);
      setLoading(false)
      // localStorage.setItem("token", res.token);
    } catch (e) {}
  };

  const searchLoads = async (vin) => {
    try {
      const res = await request(`${api}/loads?vin=${vin}`, "GET");
      return res;
    } catch (e) {
      throw new Error(e.message || "Failed to search loads");
    }
  };

  const getContacts = async (setContact) => {
    try {
      const res = await request(
        `${api}/content/contacts`,
        "GET"
      );
      console.log(res);
      
      setContact(res);
      localStorage.setItem("token", res.token);
    } catch (e) {}
  };

  return {
    getAllBlogs,
    getNewestBlog,
    getContacts,
    getPolicySections,
    getContentByType,
    getBlogById,
    searchLoads,
  };
};

export default useContentService;
