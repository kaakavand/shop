import React from "react";
import style from "../inventory.module.scss";

function InventoryRow(props) {
    return (
        <tr className={style.t_row} id={props.id}>
            <td onClick={props.editAmount} className={style.amount}>
                <span className="span" onClick={props.addTag}>{props.amount}</span>
                <input
                    placeholder={props.amount}
                    name={`amount_${props.id}`}
                    type="text"
                    style={{ display: "none" }}
                    
                    />
            </td>
            <td onClick={props.editPrice} className={style.price}>
                <span className="span" onClick={props.addTag}>{props.price}</span>
                <input
                    placeholder={props.price}
                    name={`price_${props.id}`}
                    type="text"
                    style={{ display: "none" }}
                />
            </td>
            <td className={style.name_product}>{props.name_product}</td>
        </tr>
    );
}

export default InventoryRow;
