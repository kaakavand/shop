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
    const NumberOfItems = 5;
    const numberOfPage = Math.ceil(products.length / NumberOfItems);
    const numberOfPageArray = [];

    const [spans, setSpans] = useState([]);
    const [inputs, setInputs] = useState([]);

    const edit = (e) => {
        if (e.target.classList.contains("span")) {
            e.target.parentElement.children[0].style.display = "none";
            e.target.parentElement.children[1].style.display = "block";
        }
    };

    useEffect(() => {
        props.gtProducts().then((res) => setProducts(res));
    }, [props]);

    for (let i = 1; i < numberOfPage + 1; i++) {
        numberOfPageArray.push(i);
    }

    const changePage = (e) => {
        setPage(Number(e.target.value));
        inputs.forEach((element) => {
            element.style.display = "none";
        });
        spans.forEach((element) => {
            element.style.display = "block";
        });

        props.setArrDisablesButton(true);
    };

    const inoutsSet = (e) => {
        inputs.push(e.target.parentElement.children[1]);
        spans.push(e.target.parentElement.children[0]);
        props.spanAddToParent(spans);
        props.inputAddToParent(inputs);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>موجودی</th>
                        <th>قیمت</th>
                        <th>کالا</th>
                    </tr>
                </thead>
                <tbody>
                    {products
                        .slice(
                            page * NumberOfItems - NumberOfItems,
                            page * NumberOfItems
                        )
                        .map((item) => (
                            <InventoryRow
                                key={item.id}
                                editAmount={edit}
                                editPrice={edit}
                                price={item.price}
                                amount={item.count}
                                name_product={item.firstName}
                                id={item.id}
                                addTag={inoutsSet}
                            />
                        ))}
                </tbody>
            </table>
            <ul>
                {numberOfPageArray.map((item, index) => (
                    <button
                        key={item}
                        value={item}
                        onClick={changePage}
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
        gtProducts: () => dispatch(getProducts()),
    };
};

const InventoryRed = connect(null, mapDispatchToProps)(InventoryList);

export default InventoryRed;
