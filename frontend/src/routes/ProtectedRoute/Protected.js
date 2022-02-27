import { Navigate } from "react-router-dom";
import { PATHS } from "config/routs.config";

const ProtectedRoute = (props) => {
    const {component} = props
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); 
    if (isLoggedIn) { return < Navigate replace to={PATHS.PRODUCTS_MANAGE} /> } else { return component }
};

export { ProtectedRoute };
