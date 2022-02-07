import React from "react";
import style from "../orders.module.scss";

function OrderRow(props) {
    // const check = (e) => {
    //     e.target.children[0].style.display = "none";
    //     e.target.children[1].style.display = "block";
    //     console.log(e.target.childElementCount);
    // };

    return (
        <tr className={style.t_row} id={props.id}>
            <td onClick={props.editAmount} className={style.amount}>
                <span>{props.amount}</span>
                <input
                    // value={props.amount}
                    placeholder={props.amount}
                    name = 'amount'
                    type="text"
                    style={{ display: "none" }}
                    ref={props.input}
                />
            </td>
            <td onClick={props.editPrice} className={style.price}>
                <span>{props.price}</span>
                <input
                    // value={props.price}
                    placeholder={props.price}
                    name = 'price'
                    type="text"
                    style={{ display: "none" }}
                    ref={props.input}
                />
            </td>
            <td className={style.name_product}>{props.name_product}</td>
        </tr>
    );
}

export default OrderRow;
