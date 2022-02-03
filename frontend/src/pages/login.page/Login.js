import React from "react";
import InputAdornments from "./components/Input.component";
import style from "./login.module.scss";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "config/routs.config";

function Login() {
    let navigate = useNavigate();
    const submitForm = () => {
        localStorage.setItem("isLoggedIn", true);
        navigate(PATHS.INVENTORY);
    };

    return (
        <div className={style.main_content}>
            <form onSubmit={submitForm} autocomplete="off">
                <h2>ورود به پنل مدیریت فروشگاه </h2>
                <InputAdornments />
                <Button
                    type="submit"
                    variant="contained"
                    className={style.button_submit}
                >
                    ورود
                </Button>
                <Link to={PATHS.HOME}>بازگشت به سایت</Link>
            </form>
        </div>
    );
}

export default Login;
