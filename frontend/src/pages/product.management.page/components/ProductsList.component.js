import { Button } from "@mui/material";
import React from "react";
import style from "../productManage.module.scss";
import ProductRow from "./ProductRow.component";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/productsRow.action";
import { useState } from "react";
import { useEffect } from "react";
import { getOrders } from "redux/action/orders.action";
import axios from "axios";
// import { getOrders } from "redux/action/orders.action";

function ProductsList(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const NumberOfItems = 5;
    const numberOfPage = Math.ceil(products.length / NumberOfItems);
    const numberOfPageArray = [];

    useEffect(() => {
        props.gtProducts().then((res) => setProducts(res));
        // console.log(props.gtProducts());
    }, [props]);

    for (let i = 1; i < numberOfPage + 1; i++) {
        numberOfPageArray.push(i);
    }

    const changePage = (e) => {
        setPage(Number(e.target.value));
    };

    return (
        <div className={style.table_box}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>دسته بندی</th>
                        <th>نام کالا</th>
                        <th>تصویر</th>
                    </tr>
                </thead>
                <tbody>
                    {products
                        .slice(
                            page * NumberOfItems - NumberOfItems,
                            page * NumberOfItems
                        )
                        .map((item) => (
                            <ProductRow
                                key={item.id}
                                id={item.id}
                                product={item.firstName}
                                category={item.category.name}
                                image={`http://localhost:3002/files/${item.thumbnail}`}
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
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProducts: () => dispatch(getProducts()),
        // gtOrders: () => dispatch(getOrders()),
    };
};

const ProductListRed = connect(null, mapDispatchToProps)(ProductsList);

export default ProductListRed;
