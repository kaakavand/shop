import React, { useRef } from "react";
import style from "../component.module.scss";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'

function ProductItem(props) {
    const navigate = useNavigate();
    const button = useRef();

    const navigateProduct = (e) => {
        const id = e.target.parentElement.parentElement.id;
        const category = e.target.className;
        navigate(`/${category}/${id}`);
    };

    const navigatePro = (e) => {
        if (e.target.className === style.item_box) {
            navigate(`/${button.current.className}/${e.target.parentElement.id}`);
        }
        if (e.target.className === "img") {
            console.log(e.target.parentElement.parentElement.parentElement.id);
            navigate(`/${button.current.className}/${e.target.parentElement.parentElement.parentElement.id}`);
        }
    };

    return (
        <div className={style.product_item} onClick={navigatePro} id={props.id}>
            <div className={style.item_box}>
                <figure>
                    <img
                        className="img"
                        src={`http://localhost:3002/files/${props.img}`}
                        alt=""
                    />
                </figure>
                <div className={style.info_product}>
                    <h2>{props.product_name}</h2>
                    <h3>{Number(props.price).toLocaleString()} تومان</h3>
                </div>
                <button
                    ref={button}
                    className={props.category}
                    onClick={navigateProduct}
                >
                    مشاهده محصول
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
