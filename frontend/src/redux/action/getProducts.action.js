import { ActionTypes } from "./getProductFilter.action";

export const getProductsAction = (products) => {
    return {
        type: ActionTypes.GET_PRODUCTS,
        payload: products,
    };
};