import React from "react";
import style from "../productManage.module.scss";
import ProductRow from "./ProductRow.component";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/productsRow.action";
import { useState } from "react";
import { useEffect } from "react";
import { deletProduct } from "api/products.api";

function ProductsList(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [NumberOfItems, setNumberOfItems] = useState(1);
    const numberOfPage = Math.ceil(NumberOfItems / 5);
    const [numberOfPageArray, setNumberOfPageArray] = useState([]);

    const [test, setTest] = useState(true);

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
        setNumberOfPageArray(array);
    }, [props, page, NumberOfItems , test]);

    console.log(products);

    return (
        <div className={style.table_box}>
            <table>
                <thead>
                    <tr>
                        <th>تصویر</th>
                        <th>نام کالا</th>
                        <th>دسته بندی</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <ProductRow
                            key={item.id}
                            id={item.id}
                            product={item.firstName}
                            category={item.name}
                            image={`http://localhost:3002/files/${item.thumbnail}`}
                            removeProduct={(e) => {
                                deletProduct(e.target.parentElement.id)
                                setTest(!test)
                            }}
                        />
                    ))}
                </tbody>
            </table>

            <ul>
                {numberOfPageArray.map((item) => (
                    <button
                        key={item}
                        value={item}
                        onClick={(e) => setPage(Number(e.target.value))}
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
        gtProducts: (pageNum) => dispatch(getProducts(pageNum)),
    };
};

const ProductListRed = connect(null, mapDispatchToProps)(ProductsList);

export default ProductListRed;
