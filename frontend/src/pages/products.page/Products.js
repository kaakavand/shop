import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategory } from "redux/action/caregory.action";
import { getProductsFil } from "redux/action/productFilter.acrion";
import Sidbar from "./components/Sidbar.component";
import style from "./product.module.scss";

function Products(props) {
    const params = useParams();
    const [first, setfirst] = useState([]);
    const [category, setCategory] = useState([]);

    const [page, setPage] = useState(1);
    const NumberOfItems = 6;
    const numberOfPage = Math.ceil(first.length / NumberOfItems);
    const numberOfPageArray = [];

    for (let i = 1; i < numberOfPage + 1; i++) {
        numberOfPageArray.push(i);
    }

    const changePage = (e) => {
        setPage(Number(e.target.value));
    };

    useEffect(() => {
        props.gtProductFilter(params.category).then((res) => setfirst(res));
        props.gtCategory().then((res) => setCategory(res));
    }, [props, params]);

    return (
        <Header>
            <div className={style.container}>
                <h1>{params.category}</h1>
                <div className={style.row}>
                    {first.length ? (
                        first
                            .slice(
                                page * NumberOfItems - NumberOfItems,
                                page * NumberOfItems
                            )
                            .map((productItem) => (
                                <ProductItem
                                    price={productItem.price}
                                    product_name={productItem.name}
                                    id={productItem.id}
                                    category={productItem.category}
                                    img={productItem.thumbnail.split("_")[1]}
                                />
                            ))
                    ) : (
                        <h5 className={style.h5}>محصولی یافت نشد</h5>
                    )}
                </div>
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
            <ul className={style.ul}>
                {console.log(category)}
                {category.map((item) => (
                    <li>
                        <Link to={`/${item.name}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProductFilter: (category) => dispatch(getProductsFil(category)),
        gtCategory: () => dispatch(getCategory()),
    };
};

const ProductsRed = connect(null, mapDispatchToProps)(Products);

export default ProductsRed;
