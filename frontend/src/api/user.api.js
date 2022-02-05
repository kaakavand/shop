import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";

export async function login(data) {
    try {
        const response = await axios.post("/auth/login", data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
