import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import "./assets/styles/main.scss";
import { AppRoute } from "./routes/App.Route";
// import your route components too

render(
    <Provider store={store}>
        <AppRoute />
    </Provider>,
    document.getElementById("root")
);
