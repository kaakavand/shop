import { getOrderFalse } from "api/orders.api";

export const getFalse = (page) => {
    return (dispatch, getState) => {
        return getOrderFalse(page)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};
