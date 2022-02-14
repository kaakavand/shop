import React from "react";
import style from "../orders.module.scss";
import { Button } from "@mui/material";


function OrderRow(props) {
    return (
        <tr className={style.t_row} id={props.id}>
            <td className={style.name_product}>{props.name}</td>
            <td className={style.name_product}>{props.price}</td>
            <td onClick={props.editPrice} className={style.price}>
                {props.orderSubmit}
            </td>
            <td onClick={props.editAmount} className={style.amount}>
                <Button variant="contained" className={style.button}>بررسی سفارش</Button>
            </td>
        </tr>
    );
}

export default OrderRow;
