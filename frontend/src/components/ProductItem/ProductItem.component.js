import React from "react";
import style from "../component.module.scss";
import logo from "../../assets/img/logo.png";

function ProductItem(props) {
    return (
        <div className={style.product_item} id={props.id}>
            <div className={style.item_box}>
                <figure>
                    <img src={logo} alt="" />
                </figure>
                <div className={style.info_product}>
                    <h2>{props.product_name}</h2>
                    <h3>{props.price} تومان</h3>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
