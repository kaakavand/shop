import { Button, FormControlLabel, Radio } from "@mui/material";
import { HeaderPanel } from "layout";
import React from "react";
import { useState } from "react";
import OrderInfo from "./components/OrderInfo.component";
import OrderList from "./components/OrderList.component";
import OrderListEnd from "./components/OrderListEnd.component";
import style from "./orders.module.scss";

function Orders() {
    const [radioValue, setRadio] = useState(true);
    const [orderInfo , setOrderInfo] = useState(false)

    const setInfo = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        console.log(data);
    };

    return (
        <HeaderPanel>
            <form className={style.container} onSubmit={setInfo}>
                <div className={style.row}>
                    <h3>مدیریت سفارش ها</h3>
                    <div style={{marginLeft : '15px'}}>
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="سفارش های در انتظار ارسال"
                            className={style.radio}
                            onClick={() => setRadio(true)}
                            checked={radioValue ? true : false}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                    color: "#f08502",
                                    "&.Mui-checked": {
                                        color: "#f08502",
                                    },
                                },
                            }}
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="سفارش های  ارسال شده"
                            className={style.radio}
                            checked={radioValue ? false : true}
                            onClick={() => setRadio(false)}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                    color: "#f08502",
                                    "&.Mui-checked": {
                                        color: "#f08502",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                {radioValue ? <OrderListEnd /> : <OrderList />}
            </form>
        </HeaderPanel>
    );
}

export default Orders;
