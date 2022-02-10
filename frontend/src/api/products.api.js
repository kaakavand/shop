import http from "../services/http.service";

export async function products() {
    try {
        const response = await http.get("/products");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
