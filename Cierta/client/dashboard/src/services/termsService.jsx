// src/services/policyService.js

import { API_URL } from "../helpers";

export const getPolicySections = (request, pageType) =>
  request(`${API_URL}/policies?pageType=${pageType}`);

export const createPolicySection = (request, data) =>
  request(`${API_URL}/policies`, "POST", JSON.stringify(data), {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const updatePolicySection = (request, id, data) =>
  request(`${API_URL}/policies/${id}`, "PUT", JSON.stringify(data), {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const deletePolicySection = (request, id) =>
  request(`${API_URL}/policies/${id}`, "DELETE", null, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const addContentItem = (request, id, contentData) =>
  request(`${API_URL}/policies/${id}/content`, "PATCH", JSON.stringify(contentData), {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const removeContentItem = (request, id, index) =>
  request(`${API_URL}/policies/${id}/content/${index}`, "DELETE", null, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
