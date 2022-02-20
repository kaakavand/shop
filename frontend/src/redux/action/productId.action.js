import { getProductId } from "../../api/products.api";

export const gtProductId = (id) => {
    return (dispatch, getState) => {
        return getProductId(id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
}