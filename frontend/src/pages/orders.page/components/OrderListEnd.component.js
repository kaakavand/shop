import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "redux/action/orders.action";
import OrderRow from "./OrderRow.component";
import style from "../orders.module.scss";
import OrderInfo from "./OrderInfo.component";


function OrderListEnd(props) {
    const [order, setOrder] = useState([]);
    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(false);
    const [refresh, setRefresh] = useState(false);



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
    }, [props , refresh]);


    const showOrderInfo = (e) => {
        setId(e.target.parentElement.parentElement.id)
        setFlag(true)
        console.log(e.target.parentElement.parentElement.id);
    }

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
                                click = {showOrderInfo}
                                id={item.id}
                                name={item.name}
                                price={item.totalPrice}
                                orderSubmit={new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).format(item.createdAt)}
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
            {flag ? <OrderInfo refresh={() => setRefresh(!refresh)}  flag={'yes'} closeInfo={() => setFlag(false)} id={id} /> : null}

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
