import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import { getProductsFil } from "redux/action/productFilter.acrion";
import style from "./home.module.scss";
import { Link } from "react-router-dom";

function Home(props) {
    const [category, setCategory] = useState([]);
    const [itemProduct, setItemProduct] = useState([]);

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
        props.gtProductFilter().then((res) => setItemProduct(res));
    }, [props]);

    return (
        <Header>
            <div className={style.container}>
                {category.map((item) => (
                    <>
                        <Link to={`/${item.name}`}>{item.name}</Link>
                        <div className={style.row}>
                            {itemProduct
                                .filter(
                                    (ptoduct) => ptoduct.category === item.name
                                )
                                .slice(0, 6)
                                .map((productItem) => (
                                    <ProductItem
                                        price={productItem.price}
                                        product_name={productItem.firstName}
                                        id={productItem.id}
                                    />
                                ))}
                        </div>
                    </>
                ))}
            </div>
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtCategory: () => dispatch(getCategory()),
        gtProductFilter: (category) => dispatch(getProductsFil(category)),
    };
};

const HomeRedux = connect(null, mapDispatchToProps)(Home);

export default HomeRedux;
