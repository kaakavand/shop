import { category } from "api/categoty.api";
import { ordersId } from "api/orders.api";

export const getOrder = (id) => {
    return (dispatch, getState) => {
        return ordersId(id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};
