import React from "react";
import style from "../orders.module.scss";
import { Button } from "@mui/material";


function OrderRow(props) {
    // const check = (e) => {
    //     e.target.children[0].style.display = "none";
    //     e.target.children[1].style.display = "block";
    //     console.log(e.target.childElementCount);
    // };

    return (
        <tr className={style.t_row} id={props.id}>
            <td onClick={props.editAmount} className={style.amount}>
                <Button variant="contained" className={style.button}>بررسی سفارش</Button>
            </td>
            <td onClick={props.editPrice} className={style.price}>
                125
            </td>
            <td className={style.name_product}>test</td>
            <td className={style.name_product}>salam</td>
        </tr>
    );
}

export default OrderRow;
