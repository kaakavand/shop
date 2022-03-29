import { ActionTypes } from "../action/getProductFilter.action";

const initialState = {
  productFilter: [],
};

export const productFilterRed = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRODUCT_FILTER:
      return {...state,productFilter : payload}
    default:
      return state;
  }
};