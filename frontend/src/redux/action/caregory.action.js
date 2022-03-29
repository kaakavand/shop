import { category } from "api/categoty.api";

export const getCategory = () => {
    return (dispatch, getState) => {
        return category()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };
};

