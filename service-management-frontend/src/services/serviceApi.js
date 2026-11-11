
import apiClient from "./apiClient";

// GET: Lấy danh sách tất cả services
export const getAllServices = async () => {
    const response = await apiClient.get("/services");
    return response.data;
};

// GET: Lấy service theo ID
export const getServiceById = async (id) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
};

// POST: Tạo service mới
export const createService = async (serviceData) => {
    const response = await apiClient.post("/services", serviceData);
    return response.data;
};

// PUT: Cập nhật service
export const updateService = async (id, serviceData) => {
    const response = await apiClient.put(`/services/${id}`, serviceData);
    return response.data;
};

// DELETE: Xóa service
export const deleteService = async (id) => {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data;
};
