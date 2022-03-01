import { postOrder } from "api/orders.api";
import { Header } from "layout";
import React, { useEffect, useState } from "react";
import style from "../cart.module.scss";

function Payment() {
    const [first, setfirst] = useState(false);
    const [flag, setFlag] = useState(false);
    const result = window.location.href.split("result")[1].slice(1);

    // {
    //     "id": 20,
    //     "name": "امیرحسین کاکاوند",
    //     "address": "تهران , رسالت",
    //     "phone": "09901166994",
    //     "totalPrice": "668.000",
    //     "deliverTime": "2021",
    //     "orderSubmit": "2021",
    //     "deliverEnd": "2022",
    //     "deliverd": true,
    //     "order": [
    //       {
    //         "product": "iphone 12",
    //         "idProduct": 10,
    //         "number": 3,
    //         "price": "25,000,000"
    //       },
    //       {
    //         "product": "iphone 12 pro",
    //         "idProduct": 15,
    //         "number": 5,
    //         "price": "28,000,000"
    //       }
    //     ]
    //   },

    useEffect(() => {
        if (result === "yes") {
            let total = 0
            JSON.parse(localStorage.getItem("cart_item")).forEach(item => {
                total += (+item.price * item.number)
            }); 

            const obj = {
                name: JSON.parse(localStorage.getItem("user")).name,
                lastName: JSON.parse(localStorage.getItem("user")).lastName,
                address: JSON.parse(localStorage.getItem("user")).adress,
                phone: JSON.parse(localStorage.getItem("user")).phone,
                totalPrice: total,
                deliverTime: JSON.parse(localStorage.getItem("user")).date,
                deliverEnd: "",
                deliverd: false,
                order: JSON.parse(localStorage.getItem("cart_item")),
            };

            setfirst(true);
            postOrder(obj);

            setFlag(true);
        } else {
            setfirst(false);
        }
    }, []);

    return (
        <Header close={first}>
            <div className={style.container}>
                {first ? <h1>پرداخت موفق</h1> : <h1>پرداخت انجام نشد</h1>}
            </div>
        </Header>
    );
}

export default Payment;
