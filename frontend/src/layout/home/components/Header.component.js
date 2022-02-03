import style from "../../home/home.module.scss";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { PATHS } from 'config/routs.config'
import { useSelector } from "react-redux";

const Header = (props) => {

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    return (
        <>
            <div className={style.header_fluid}>
                <header>
                    <nav>
                        
                        <ul>
                            <li style={{display : props.showCars}}>
                                <Link to={PATHS.CART}>
                                    سبد خرید
                                    <LocalGroceryStoreIcon fontSize="medium" />
                                </Link>
                            </li>
                            <li>
                                {isLoggedIn ? <Link to={PATHS.INVENTORY}>مدیریت</Link> : <Link to={PATHS.LOGIN}>ورود</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Link to={PATHS.HOME} className={style.logo_box}>
                        <h1>فروشگاه اینترنتی</h1>
                        <figure>
                            <img src={Logo} alt="logo" />
                        </figure>
                    </Link>
                </header>
            </div>
            {props.children}
        </>
    );
};



export { Header };
