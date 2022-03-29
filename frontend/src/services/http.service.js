import axios from "axios";
import { PATHS } from "config/routs.config";
// import { createBrowserHistory } from "history";
import { createBrowserHistory } from "history";
import { toast } from "react-toastify";


const history = createBrowserHistory()
class HttpService {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3002";

        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("ACCESS_TOKEN");

                if (config.url !== "/auth/login") {
                    config.headers["Token"] = `${token}`;
                }
                return config;
            },
            (error) => {
                console.log(error.response);
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                toast.error(error.response.data);
                if (error.response.status === 401) {
                    localStorage.setItem("isLoggedIn", false);
                    history.push(PATHS.LOGIN);
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        );
    }

    get(url, config) {
        return axios.get(url, config);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        return axios.put(url, data, config);
    }

    patch(url, data, config) {
        return axios.patch(url, data, config);
    }

    delete(url, data, config) {
        return axios.delete(url, data, config);
    }
}

export default new HttpService();
