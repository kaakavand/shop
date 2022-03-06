import { Header } from "layout";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import style from "./cart.module.scss";
import { connect } from "react-redux";
import { gtProductId } from "redux/action/productId.action";
import { useNavigate } from "react-router-dom";
import { PATHS } from "config/routs.config";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import HijriExample from './components/DatePicker.component'

function Cart(props) {
    const [first, setfirst] = useState(null);
    const [price, setPrice] = useState(0);
    const [flag, setFlag] = useState(false);
    const ref = useRef();
    const tbody = useRef();
    const navigata = useNavigate()

    useEffect(() => {
        setfirst(JSON.parse(localStorage.getItem("cart_item")));
    }, [props, flag]);
    
    useEffect(() => {
        let sum = 0;
        if (first) {
            first.forEach((item) => {
                sum += Number(item.number) * Number(item.price);
            });
            if (!tbody.current.children.length) {
                setfirst(null)
                console.log(tbody.current.children.length);
            }
        }
        setPrice(sum);

    }, [first, flag]);
    
    const setSum = async (e) => {
        let num;
        const id = Number(e.target.className);
        await props.gtProduct(id).then((res) => (num = res.count));


        if (+e.target.parentElement.querySelector("input").value < num) {
            let ls = JSON.parse(localStorage.getItem("cart_item"));
            const arr = [];
            ls.forEach((item) => {
                if (+item.id !== +id) {
                    arr.push(item);
                }
                if (+item.id === +id) {
                    item.number = item.number + 1;
                    arr.push(item);
                }
            });

            console.log(arr);
            localStorage.setItem("cart_item", JSON.stringify(arr));
            setFlag(!flag);
        }
    };

    const setSub = async (e) => {
        let num = 1;
        const id = Number(e.target.className);

        if (+e.target.parentElement.querySelector("input").value > 1) {
            console.log(e.target.parentElement.querySelector("input").value);
            let ls = JSON.parse(localStorage.getItem("cart_item"));
            const arr = [];
            ls.forEach((item) => {
                if (+item.id !== +id) {
                    arr.push(item);
                }
                if (+item.id === +id) {
                    item.number = item.number - 1;
                    arr.push(item);
                }
            });

            console.log(arr);
            localStorage.setItem("cart_item", JSON.stringify(arr));
            setFlag(!flag);
        }
    };

    const remove = (e) => {
        confirmAlert({
            title: "محصول حذف شود ؟",
            // message: "Are you sure to do this.",
            buttons: [
                {
                    label: "بله",
                    onClick: () => {
                        let id = e.target.className;
                        const arr = [];
                        JSON.parse(localStorage.getItem("cart_item")).forEach((item) => {
                            if (item.id !== id) {
                                arr.push(item);
                            }
                        });
                        localStorage.setItem("cart_item", JSON.stringify(arr));
                        setFlag(!flag)
                    },
                },
                {
                    label: "خیر",
                    onClick: () => console.log('no')
                },
            ],
        });
    };

    return (
        <Header showCars="none">
            <div className={style.container}>
                <div className={style.row}>
                    <h2>سبد خرید</h2>
                </div>
                {first ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={style.name}>کالا</th>
                                <th className={style.price}>قیمت</th>
                                <th className={style.count}>تعداد</th>
                            </tr>
                        </thead>
                        <tbody ref={tbody}>
                            {first.map((item) => (
                                <tr>
                                    <th className={style.name}>{item.name}</th>
                                    <th className={style.price}>
                                        {Number(item.price).toLocaleString()}
                                    </th>
                                    <th className={style.count}>
                                        <div className={style.counter}>
                                            <button
                                                onClick={setSum}
                                                className={item.id}
                                            >
                                                +
                                            </button>
                                            <input
                                                ref={ref}
                                                type="number"
                                                value={item.number}
                                            />
                                            <button
                                                onClick={setSub}
                                                className={item.id}
                                            >
                                                -
                                            </button>
                                        </div>
                                        <button
                                            className={item.id}
                                            onClick={remove}
                                        >
                                            حذف
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>سبد سفارش خالی است</h1>
                )}
                <div className={style.rowEnd}>
                    <h2>جمع سفارش : {Number(price).toLocaleString()} تومان</h2>
                    <Button
                        variant="contained"
                        type="submit"
                        className={style.button}
                        onClick={() => navigata(PATHS.FORM)}
                        disabled = {first ? false : true}
                    >
                        نهایی کردن سبد خرید
                    </Button>
                    {/* <HijriExample/> */}
                </div>
            </div>
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProduct: (id) => dispatch(gtProductId(id)),
    };
};

const CartRed = connect(null, mapDispatchToProps)(Cart);

export default CartRed;
