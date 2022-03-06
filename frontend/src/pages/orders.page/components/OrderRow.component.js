import React, { useState } from "react";
import style from "../orders.module.scss";
import { Button } from "@mui/material";
import OrderInfo from "./OrderInfo.component";

function OrderRow(props) {

    return (
        <>
            <tr className={style.t_row} id={props.id}>
                <td className={style.name_product}>{props.name}</td>
                <td className={style.name_product}>{Number(props.price).toLocaleString()}</td>
                <td onClick={props.editPrice} className={style.price}>
                    {props.orderSubmit}
                </td>
                <td onClick={props.editAmount} className={style.amount}>
                    <Button
                        onClick={props.click}
                        variant="contained"
                        className={style.button}
                    >
                        بررسی سفارش
                    </Button>
                </td>
            </tr>
        </>
    );
}

export default OrderRow;
