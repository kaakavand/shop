import { ActionTypes } from "../action/getProductFilter.action";

const initialState = {
  productId: {},
};

export const getProductRed = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRODUCT_ID:
      return {...state,productId : payload}
    default:
      return state;
  }
};