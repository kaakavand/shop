import { getProductFilter } from "../../api/products.api";

export const getProductsFil = () => {
    return (dispatch, getState) => {
        return getProductFilter()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}