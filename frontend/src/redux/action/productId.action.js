import { getProductId } from "../../api/products.api";
import { ActionTypes } from "./getProductFilter.action";

export const getProductWId = (product) => {
    return {
        type: ActionTypes.GET_PRODUCT_ID,
        payload: product,
    };
};

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
};
