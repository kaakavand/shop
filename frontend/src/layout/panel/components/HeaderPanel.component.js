import { Link, Navigate, useNavigate } from "react-router-dom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { PATHS } from "config/routs.config";
import style from "../../panel/panel.module.scss";
import Logo from "../../../assets/img/logo.png";
import ColorToggleButton from "./Toggle.component";


const HeaderPanel = (props) => {
    let navigate = useNavigate();
    const exite = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate(PATHS.HOME);
    };


    return (
        <>
            <div className={style.header_fluid}>
                <header>
                    <Link to={PATHS.ORDERS} className={style.logo_box}>
                        <h1>مدیریت فروشگاه</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <ColorToggleButton />
                            </li>
                            <Link to={PATHS.HOME}>بازگشت به سایت</Link>
                            <button className={style.exit} onClick={exite}>
                                خروج
                            </button>
                        </ul>
                    </nav>
                </header>
            </div>
            {props.children}
        </>
    );
};

export { HeaderPanel };
