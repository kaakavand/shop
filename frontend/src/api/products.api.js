import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";

export async function products() {
    try {
        const response = await axios.get("/products");
        return response.data;
    } catch (e) {
        return e;
    }
}
