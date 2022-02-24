import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import {
    getProductsFil,
    getProductsFilAll,
} from "redux/action/productFilter.acrion";
import style from "./home.module.scss";
import { Link } from "react-router-dom";

function Home(props) {
    const [category, setCategory] = useState([]);
    const [itemProduct, setItemProduct] = useState([]);
    const [first, setfirst] = useState(false);
    const ref = useRef();

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
        props.gtProductFilter().then((res) => setItemProduct(res));

    }, [props]);


    return (
        <Header>
            <div className={style.container} ref={ref}>
                {category.map((item) => (
                    <div>
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
                                        product_name={productItem.name}
                                        id={productItem.id}
                                        category={productItem.category}
                                        img={productItem.thumbnail.split('_')[1]}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtCategory: () => dispatch(getCategory()),
        gtProductFilter: (category) => dispatch(getProductsFilAll(category)),
    };
};

const HomeRedux = connect(null, mapDispatchToProps)(Home);

export default HomeRedux;
