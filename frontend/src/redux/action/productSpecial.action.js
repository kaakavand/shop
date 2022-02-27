import { productsSpecial } from "api/products.api";

export const getSpecial = () => {
    return (dispatch, getState) => {
        return productsSpecial()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};
