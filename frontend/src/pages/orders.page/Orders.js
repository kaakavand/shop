import { Button } from "@mui/material";
import { HeaderPanel } from "layout";
import React from "react";
import OrderList from "./components/OrderList.component";
import style from "./orders.module.scss";

function Orders() {

    const setInfo = (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        console.log(data);
    }

    return (
        <HeaderPanel>
            <form className={style.container} onSubmit={setInfo}>
                <div className={style.row}>
                    <Button variant="contained" type="submit" className={style.button}>
                        ذخیره
                    </Button>
                    <h3>مدیریت موجودی و کالا ها</h3>
                </div>
                <OrderList/>
            </form>
        </HeaderPanel>
    );
}

export default Orders;
