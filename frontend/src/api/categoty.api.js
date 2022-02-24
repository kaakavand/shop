import http from "../services/http.service";

export async function category() {
    try {
        const response = await http.get("/category");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}


export async function postCategory(data) {
    try {
        const response = await http.post(`/category` , data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}