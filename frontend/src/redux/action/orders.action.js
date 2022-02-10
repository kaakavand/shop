import { orders } from "../../api/orders.api";

export const getOrders = () => {
    return (dispatch, getState) => {
        return orders()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};