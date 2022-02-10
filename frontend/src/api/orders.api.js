import http from "../services/http.service";


export async function orders() {
    try {
        const response = await http.get("/order");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
