import { products } from "../../api/products.api";

export const getProducts = () => {
    return (dispatch, getState) => {
        return products()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};