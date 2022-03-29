import React from "react";
import InputAdornments from "./components/Input.component";
import style from "./login.module.scss";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "config/routs.config";
import { connect } from "react-redux";
import { login } from "../../redux/action/login.action";
import { useRef } from "react";
import { toast } from "react-toastify";

function Login(props) {
    let navigate = useNavigate();
    const formRef = useRef();

    const submitForm = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        if (data.username.length > 3 && data.password.length > 3) {
            try {
                await props.login(data);
                navigate(PATHS.PRODUCTS_MANAGE);
            } catch (e) {
                formRef.current.style.boxShadow =
                    "rgbA(244, 67, 54 , 100%) 0 0 5px 0.25rem";
            }
        } else {
            formRef.current.style.boxShadow =
                "rgbA(244, 67, 54 , 100%) 0 0 5px 0.25rem";
            toast.error("No user with those credentials!");
        }
    };

    return (
        <div className={style.main_content}>
            <form onSubmit={submitForm} autocomplete="off" ref={formRef}>
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

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data)),
});

const LoginRedux = connect(undefined, mapDispatchToProps)(Login);

export default LoginRedux;
