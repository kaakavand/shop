import style from "../../home/home.module.scss";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { PATHS } from "config/routs.config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = (props) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    const [number, setNumber] = useState(0);
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if (props.close) {
            localStorage.setItem("cart_item", JSON.stringify([]));
        }
    }, [props]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cart_item"))) {
            let ls = JSON.parse(localStorage.getItem("cart_item"));
            let num = 0;
            ls.forEach((item) => {
                num += item.number;
            });
            setNumber(num);
        }
        if (props.flag) {
            setFlag(!flag);
        }
    }, [props]);

    return (
        <>
            <div className={style.header_fluid}>
                <header>
                    <Link to={PATHS.HOME} className={style.logo_box}>
                        <figure>
                            <img src={Logo} alt="logo" />
                        </figure>
                        <h1>فروشگاه اینترنتی</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                {isLoggedIn ? (
                                    <Link to={PATHS.INVENTORY}>مدیریت</Link>
                                ) : (
                                    <Link to={PATHS.LOGIN}>ورود</Link>
                                )}
                            </li>
                            <li style={{ display: props.showCars }}>
                                <Link to={PATHS.CART}>
                                    <LocalGroceryStoreIcon fontSize="medium" />
                                    سبد خرید
                                    {number ? (
                                        <h5 classNmae={style.cartNumber}>
                                            {number}
                                        </h5>
                                    ) : null}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            {props.children}
            {/* <footer>
                طراحی شده توسط amirhosein
            </footer> */}
        </>
    );
};

export { Header };
