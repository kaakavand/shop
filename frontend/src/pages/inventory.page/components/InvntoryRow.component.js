import React, { useState } from "react";
import style from "../inventory.module.scss";
import ButtonInout from "./ButtonInout.component";

function InventoryRow(props) {
    const [valueButton, setValueButton] = useState(true);

    return (
        <tr className={style.t_row} id={props.id}>
            <td className={style.name_product}>{props.name_product}</td>
            <ButtonInout
                setValueNutton={(value) => setValueButton(value)}
                placeholder={props.price}
                name={props.priceId}
                value={props.price}
                setRender={props.setRender}
            />
            <ButtonInout
                setValueNutton={(value) => setValueButton(value)}
                placeholder={props.count}
                name={props.amountId}
                value={props.amount}
                setRender={props.setRender}
            />
        </tr>
    );
}

export default InventoryRow;
