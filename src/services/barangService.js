import api from "./api";

export const getBarangList = async (page = 1, limit = 10) => {
    const response = await api.get("/barangs", {
        params: {
            page,
            limit
        }
    });
    const rows = response.data.data;
    rows.meta = response.data.meta;
    return rows;
}

export const getBarangById = async (id) => {
    const response = await api.get(`/barangs/${id}`);
    return response.data;
}

export const createBarang = async (barangData) => {
    const response = await api.post("/barangs", barangData);
    return response.data;
}

export const updateBarang = async (id, barangData) => {
    const response = await api.put(`/barangs/${id}`, barangData);
    return response.data;
}

export const deleteBarang = async (id) => {
    const response = await api.delete(`/barangs/${id}`);
    return response.data;
}

export const getImage = (imagePath) => {
    if (!imagePath) return null;
    if(/^https?:\/\//i.test(imagePath)) return imagePath;
    const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");
    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
}
