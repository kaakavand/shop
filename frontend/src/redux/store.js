import { createStore } from "redux";

const initialState = {
    arr: [],
};

export const reducer = (state = initialState, action) => {
    return state;
};

const store = createStore(reducer);

export default store;
