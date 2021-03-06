import { Navigate } from "react-router-dom";
import { PATHS } from "config/routs.config";

const PrivateRoute = (props) => {
    const {component} = props
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); 

    if (!isLoggedIn) { return < Navigate replace to={PATHS.HOME} /> } else { return component }
};

export { PrivateRoute };