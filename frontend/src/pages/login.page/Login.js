import React from "react";
import InputAdornments from "./components/Input.component";
import style from "./login.module.scss";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "config/routs.config";
import { connect } from "react-redux";
import { login } from "../../redux/action/login.action";

function Login(props) {
    let navigate = useNavigate();


    const submitForm = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        try {
            const response = await props.login(data);
            console.log(response.token);
        } catch (e) {}
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

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data)),
});

const LoginRedux = connect(undefined, mapDispatchToProps)(Login);

export default LoginRedux;
