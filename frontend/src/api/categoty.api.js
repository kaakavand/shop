import http from "../services/http.service";

export async function category() {
    try {
        const response = await http.get("/category");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
