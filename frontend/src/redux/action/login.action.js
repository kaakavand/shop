import * as api from "api/user.api";

export const login = (data) => {
    return (dispatch, getState) => {
        return api
            .login(data)
            .then((response) => {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("ACCESS_TOKEN", response.token);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    };
};
