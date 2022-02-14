import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "redux/action/orders.action";
import OrderRow from "./OrderRow.component";
import style from "../orders.module.scss";

function OrderListEnd(props) {
    const [order, setOrder] = useState([]);

    const [page, setPage] = useState(1);
    const NumberOfItems = 5;
    const numberOfPage = Math.ceil(order.length / NumberOfItems);
    const numberOfPageArray = [];

    for (let i = 1; i < numberOfPage + 1; i++) {
        numberOfPageArray.push(i);
    }

    const changePage = (e) => {
        setPage(Number(e.target.value));
    };

    useEffect(() => {
        props
            .gtOrders()
            .then((res) =>
                setOrder(res.filter((item) => item.deliverd === false))
            );
    }, [props]);

    console.log(order);
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
                    {order
                        .slice(
                            page * NumberOfItems - NumberOfItems,
                            page * NumberOfItems
                        )
                        .map((item) => (
                            <OrderRow
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.totalPrice}
                                orderSubmit={item.orderSubmit}
                                amount="120"
                                name_product="iphone 13"
                            />
                        ))}
                </tbody>
            </table>
            <ul>
                {numberOfPageArray.map((item) => (
                    <button
                        key={item}
                        value={item}
                        onClick={changePage}
                        className={item == page ? style.active : null}
                    >
                        {item}
                    </button>
                ))}
            </ul>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtOrders: () => dispatch(getOrders()),
    };
};

const OderListEndRed = connect(null, mapDispatchToProps)(OrderListEnd);

export default OderListEndRed;


