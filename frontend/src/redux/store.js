import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { LoginReducer } from "./reducer/login.reducer";

const reducer = combineReducers({
    login : LoginReducer
})

const store = createStore(reducer , applyMiddleware(thunk));


export default store;