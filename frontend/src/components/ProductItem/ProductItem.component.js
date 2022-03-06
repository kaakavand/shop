import React from "react";
import style from "../component.module.scss";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {

    const navigate = useNavigate()

    const navigateProduct = (e) => {
        const id = e.target.parentElement.parentElement.id
        const category = e.target.className
        navigate(`/${category}/${id}`)
    }

    return (
        <div className={style.product_item} id={props.id}>
            <div className={style.item_box}>
                <figure>
                    <img src={`http://localhost:3002/files/${props.img}`} alt="" />
                </figure>
                <div className={style.info_product}>
                    <h2>{props.product_name}</h2>
                    <h3>{Number(props.price).toLocaleString()} تومان</h3>
                </div>
            <button className={props.category} onClick={navigateProduct}>مشاهده محصول</button>
            </div>
        </div>
    );
}

export default ProductItem;
