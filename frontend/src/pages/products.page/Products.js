import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsFil } from "redux/action/productFilter.acrion";
import style from "./product.module.scss";

function Products(props) {
    const params = useParams();
    const [first, setfirst] = useState([]);

    useEffect(() => {
        props.gtProductFilter().then((res) => setfirst(res));
    }, [props]);

    console.log(params.category);
    return (
        <Header>
            <div className={style.container}>
                <h1>{params.category}</h1>
                <div className={style.row}>
                    {first.filter(item => item.category === params.category).map((productItem) => (
                        <ProductItem
                            price={productItem.price}
                            product_name={productItem.firstName}
                            id={productItem.id}
                        />
                    ))}
                </div>
            </div>
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
