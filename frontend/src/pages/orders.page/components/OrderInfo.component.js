import { Button } from "@mui/material";
import { editOrder } from "api/orders.api";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOrder } from "redux/action/getIdOrder.action";
import style from "../orders.module.scss";
import http from "../../../services/http.service";

function OrderInfo(props) {
    // const [id, setId] = useState(false);
    const [value, setValue] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        props.gtOrders(props.id).then((res) => setValue(res));
        if (props.flag) {
            setFlag(true);
        }

        console.log(props);
    }, [props]);

    console.log(value);

    return (
        <div className={style.info_box}>
            <form>
                <div className={style.row}>
                    <h2>اطلاعات سفارش</h2>
                    <span onClick={() => props.closeInfo()}>X</span>
                </div>
                <h3>نام مشتری : {value.name + " " + value.lastName}</h3>
                <h3> آدرس : {value.address}</h3>
                <h3> تلفن : {value.phone}</h3>
                <h3 style={{ marginTop: "35px" }}>
                    {" "}
                    زمان تحویل : {value.deliverTime}
                </h3>
                <h3 style={{ marginBottom: "35px" }}>
                    {" "}
                    زمان سفارش :{" "}
                    {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(value.createdAt)}
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th className={style.name}>کالا</th>
                            <th className={style.price}>قیمت</th>
                            <th className={style.count}>تعداد</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.order
                            ? value.order.map((item) => (
                                  <tr>
                                      <th className={style.name}>
                                          {item.name}
                                      </th>
                                      <th className={style.price}>
                                          {item.price}
                                      </th>
                                      <th className={style.count}>
                                          {item.number}
                                      </th>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={flag ? false : true}
                    onClick={async (e) => {
                        e.preventDefault()
                        try {
                            const response = await http.patch(
                                `/orders/${props.id}`,
                                { deliverd: true }
                            );
                            props.refresh()
                            return response.data;
                        } catch (e) {
                            console.log(e);
                            return Promise.reject(e);
                        }
                    }}
                >
                    تحویل شد
                </Button>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtOrders: (id) => dispatch(getOrder(id)),
    };
};

const OrderInfoRef = connect(null, mapDispatchToProps)(OrderInfo);

export default OrderInfoRef;
