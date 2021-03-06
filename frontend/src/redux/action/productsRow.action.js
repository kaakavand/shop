import { deletProduct, products } from "../../api/products.api";

export const getProducts = (pageNum) => {
    return (dispatch, getState) => {
        return products(pageNum)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}