import http from "../services/http.service";


export async function login(data) {
    try {
        const response = await http.post("/auth/login", data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
