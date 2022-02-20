import React from "react";
import style from "../productManage.module.scss";
import ProductRow from "./ProductRow.component";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/productsRow.action";
import { useState } from "react";
import { useEffect } from "react";
import { deletProduct } from "api/products.api";
import ModalAdd from "./ModalAdd.component";

function ProductsList(props) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [NumberOfItems, setNumberOfItems] = useState(1);
    const numberOfPage = Math.ceil(NumberOfItems / 5);
    const [numberOfPageArray, setNumberOfPageArray] = useState([]);
    const [first, setfirst] = useState(false);
    const [id, setId] = useState(false);
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
    }, [props, page, NumberOfItems, test]);

    return (
        <>
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
                                product={item.name}
                                category={item.category}
                                image={`http://localhost:3002/files/${
                                    item.thumbnail.split("_")[1]
                                }`}
                                setStateEdit={(e) => {
                                    if (e.target.parentElement.id) {
                                        setfirst(true);
                                        setId(e.target.parentElement.id);
                                    }
                                }}
                                removeProduct={(e) => {
                                    deletProduct(e.target.parentElement.id);
                                    setTest(!test);
                                    if (e.target.parentElement.parentElement.parentElement.children.length == '1') {
                                        setPage(page - 1)
                                    }
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
            {first ? (
                <ModalAdd id={id} flag={true} setModalAdd={() => setfirst(false)} />
            ) : null}
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProducts: (pageNum) => dispatch(getProducts(pageNum)),
    };
};

const ProductListRed = connect(null, mapDispatchToProps)(ProductsList);

export default ProductListRed;
