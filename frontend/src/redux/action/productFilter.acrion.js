import { getProductFilter, getProductFilterAll } from "../../api/products.api";

export const getProductsFil = (category) => {
    return (dispatch, getState) => {
        return getProductFilter(category)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}

export const getProductsFilAll = () => {
    return (dispatch, getState) => {
        return getProductFilterAll()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}