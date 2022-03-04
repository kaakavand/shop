import {getProductFilterCategory} from '../../api/products.api'

export const getProductsFilCategory = (category) => {
    return (dispatch, getState) => {
        return getProductFilterCategory(category)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}