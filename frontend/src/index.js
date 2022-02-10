import { getUsers } from "api/user.api";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import "./assets/styles/main.scss";
import { AppRoute } from "./routes/App.Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import your route components too

// console.log(getUsers().then(res => console.log(res)));
render(
    <Provider store={store}>
        <AppRoute />
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </Provider>,
    document.getElementById("root")
);
