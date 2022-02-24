import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsFil } from "redux/action/productFilter.acrion";
import Sidbar from "./components/Sidbar.component";
import style from "./product.module.scss";

function Products(props) {
    const params = useParams();
    const [first, setfirst] = useState([]);
    console.log(params);

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
    }, [props]);

    return (
        <Header>
            <div className={style.container}>
                <h1>{params.category}</h1>
                <div className={style.row}>
                    {first
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
                        ))}
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
            <Sidbar />
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProductFilter: (category) => dispatch(getProductsFil(category)),
    };
};

const ProductsRed = connect(null, mapDispatchToProps)(Products);

export default ProductsRed;
