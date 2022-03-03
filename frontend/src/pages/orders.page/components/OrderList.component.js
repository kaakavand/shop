import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "redux/action/orders.action";
import OrderRow from "./OrderRow.component";
import style from "../orders.module.scss";
import OrderInfo from "./OrderInfo.component";
import { getTrue } from "redux/action/getTrueOrder.action";

function OrderList(props) {
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // const [page, setPage] = useState(1);
    // const NumberOfItems = 5;
    // const numberOfPage = Math.ceil(order.length / NumberOfItems);
    // const numberOfPageArray = [];

    const [order, setOrder] = useState([]);
    // const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [NumberOfItems, setNumberOfItems] = useState(1);
    const numberOfPage = Math.ceil(NumberOfItems / 5);
    const [numberOfPageArray, setNumberOfPageArray] = useState([]);
    const [first, setfirst] = useState(false);

    useEffect(() => {
        props
            .gtTrue(page)
            .then((res) => setOrder(res.slice(0, res.length - 1)));
        props
            .gtTrue(page)
            .then((res) =>
                setNumberOfItems(Number(res.slice(res.length - 1)[0]))
            );
        const array = [];
        for (let i = 1; i < numberOfPage + 1; i++) {
            array.push(i);
        }

        setfirst(props.setRender);
        setNumberOfPageArray(array);
    }, [props, page, NumberOfItems, first, refresh]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>نام کاربر</th>
                        <th>مجموع قیمت</th>
                        <th>زمان ثبت سفارش</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item) => (
                        <OrderRow
                            click={(e) => {
                                setId(e.target.parentElement.parentElement.id);
                                setFlag(true);
                            }}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.totalPrice}
                            orderSubmit={new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }).format(item.createdAt)}
                        />
                    ))}
                </tbody>
            </table>
            <ul>
                {numberOfPageArray.map((item, index) => (
                    <button
                        key={item}
                        value={item}
                        onClick={(e) => setPage(Number(e.target.value))}
                        className={item == page ? style.active : null}
                        type="button"
                    >
                        {item}
                    </button>
                ))}
            </ul>
            {flag ? (
                <OrderInfo
                    refresh={() => setRefresh(!refresh)}
                    closeInfo={() => setFlag(false)}
                    id={id}
                />
            ) : null}
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtOrders: () => dispatch(getOrders()),
        gtTrue: (page) => dispatch(getTrue(page)),
    };
};

const OderListRed = connect(null, mapDispatchToProps)(OrderList);

export default OderListRed;
