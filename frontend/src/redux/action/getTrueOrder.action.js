import { getOrderTrue } from "api/orders.api";

export const getTrue = (page) => {
    return (dispatch, getState) => {
        return getOrderTrue(page)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};
