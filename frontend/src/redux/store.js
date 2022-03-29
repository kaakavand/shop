import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
// import { categoryReducer } from "./reducer/category.reducer";
import { productFilterRed } from "./reducer/getProductFilter.reducer";
import { getProductRed } from "./reducer/getProductId.reducer";
import { getProductsRed } from "./reducer/getProducts.reducer";
import { LoginReducer } from "./reducer/login.reducer";

const reducer = combineReducers({
    login : LoginReducer,
    ProductFilter : productFilterRed,
    Products : getProductsRed,
    ProductId : getProductRed,
})

const store = createStore(reducer , applyMiddleware(thunk));


export default store;