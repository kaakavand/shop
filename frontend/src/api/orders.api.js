import http from "../services/http.service";


export async function orders() {
    try {
        const response = await http.get("/orders");
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function ordersId(id) {
    try {
        const response = await http.get(`/orders/${id}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function postOrder(data) {
    try {
        const response = await http.post(`/orders` , data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}


export async function editOrder(id , data) {
    try {
        const response = await http.patch(`/orders/${id}` , data);
        return response.data;
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}


export async function getOrderTrue(page) {
    try {
        const response = await http.get(`/orders?deliverd=true&_limit=5&_page=${page}`);
        const all = response.headers['x-total-count']
        return response.data.concat(all);
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function getOrderFalse(page) {
    try {
        const response = await http.get(`/orders?deliverd=false&_limit=5&_page=${page}`);
        const all = response.headers['x-total-count']
        return response.data.concat(all);
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

