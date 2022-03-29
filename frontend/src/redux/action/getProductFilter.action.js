export const ActionTypes = {
    GET_PRODUCT_FILTER: "GET_PRODUCT_FILTER",
    GET_PRODUCTS: "GET_PRODUCTS",
    GET_PRODUCT_ID: "GET_PRODUCT_ID",
};
export const getProductFilterAction = (products) => {
    return {
        type: ActionTypes.GET_PRODUCT_FILTER,
        payload: products,
    };
};