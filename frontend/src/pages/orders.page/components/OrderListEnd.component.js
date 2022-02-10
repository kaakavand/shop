import React from "react";
import { useRef } from "react";
import OrderRow from "./OrderRow.component";

function OrderListEnd() {


    const edit = (e) => {
        e.target.children[0].style.display = "none";
        e.target.children[1].style.display = "block";
    };

    return (
        <table>
            <tr>
                <th></th>
                <th>زمان ثبت سفارش</th>
                <th>مجموع قیمت</th>
                <th>نام کاربر</th>
            test
            </tr>
            <OrderRow
                editAmount={edit}
                editPrice={edit}
                price="21"
                amount="120"
                name_product="iphone 13"
            />
        </table>
    );
}

export default OrderListEnd;
