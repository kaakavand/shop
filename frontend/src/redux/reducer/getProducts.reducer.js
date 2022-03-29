import { ActionTypes } from "../action/getProductFilter.action";

const initialState = {
    products: [],
    pageProducts : ''
};

export const getProductsRed = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_PRODUCTS:
            return { ...state, products: payload };
        default:
            return state;
    }
};
