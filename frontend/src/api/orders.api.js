import http from "../services/http.service";


export async function orders() {
    try {
        const response = await http.get("/orders");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
