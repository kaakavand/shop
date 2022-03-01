import React, { useEffect, useState } from "react";
import style from "../orders.module.scss";

function OrderInfo(props) {
    const [id, setId] = useState(false);

    useEffect(() => {
        console.log(props);
    }, [])
    

    return (
        <div className={style.info_box}>
            <form>asdffasd</form>
        </div>
    );
}

export default OrderInfo;
