import { Button } from "@mui/material";
import React from "react";
import style from "../productManage.module.scss";

function ProductRow(props) {
    return (
        <tr className={style.t_row}>
            <td className={style.button_box} id={props.id}>
                <Button variant="contained" className={style.delet}>
                    حذف
                </Button>
                <Button variant="contained" className={style.edit}>
                    ویرایش
                </Button>
            </td>
            <td className={style.name_category}>{props.category}</td>
            <td className={style.name_product}>{props.product}</td>
            <td className={style.img_box}>
                <img src={props.image} alt="icone" />
            </td>
        </tr>
    );
}

export default ProductRow;
