import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "redux/action/productsRow.action";
import InventoryRow from "./InvntoryRow.component";
import style from "../inventory.module.scss";

function InventoryList(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [NumberOfItems, setNumberOfItems] = useState(1);
    const numberOfPage = Math.ceil(NumberOfItems / 5);
    const [numberOfPageArray, setNumberOfPageArray] = useState([]);
    const [first, setfirst] = useState(false)


    useEffect(() => {
        props
        .gtProducts(page)
        .then((res) => setProducts(res.slice(0, res.length - 1)));
        props
        .gtProducts(page)
        .then((res) =>
        setNumberOfItems(Number(res.slice(res.length - 1)[0]))
        );
        const array = [];
        for (let i = 1; i < numberOfPage + 1; i++) {
            array.push(i);
        }
        
        setfirst(props.setRender)
        setNumberOfPageArray(array);
    }, [props, page, NumberOfItems , first]);
    
    
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>کالا</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <InventoryRow
                            key={item.id}
                            price={item.price}
                            amount={item.count}
                            name_product={item.firstName}
                            priceId={`price_${item.id}`}
                            amountId = {`amount_${item.id}`}
                            count = {item.count}
                            id={item.id}
                            setRender={props.setRender}
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
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProducts: (pageNum) => dispatch(getProducts(pageNum)),
    };
};

const InventoryRed = connect(null, mapDispatchToProps)(InventoryList);

export default InventoryRed;
