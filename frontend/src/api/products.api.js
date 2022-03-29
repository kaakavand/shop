import http from "../services/http.service";

export async function products(pageNum) {
    try {
        const response = await http.get(
            `/products/?_limit=${5}&_page=${pageNum}`
        );
        const all = response.headers["x-total-count"];
        return response.data.concat(all);
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function productsSpecial() {
    try {
        const response = await http.get(`/products/?_limit=${3}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getProductFilter(category) {
    try {
        const response = await http.get(
            `/products/?category=${category}&_limit=3`
        );

        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getProductFilterCategory(category) {
    try {
        const response = await http.get(`/products/?category=${category}`);

        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getProductFilterAll() {
    try {
        const response = await http.get(`/products`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deletProduct(id) {
    try {
        const response = await http.delete(`/products/${id}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getProductId(id) {
    try {
        const response = await http.get(`/products/${id}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function postProduct(data) {
    try {
        const response = await http.post(`/products`, data);
        console.log(response);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function editInventory(id, data) {
    try {
        const response = await http.patch(`/products/${id}`, data);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function upload(data) {
    try {
        const response = await http.post(`/upload`, data);
        return response.data;
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}
