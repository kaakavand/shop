import ProductItem from "components/ProductItem/ProductItem.component";
import { Header } from "layout";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import {
    getProductsFil,
    getProductsFilAll,
} from "redux/action/productFilter.acrion";
import style from "./home.module.scss";
import { Link } from "react-router-dom";
import { getSpecial } from "redux/action/productSpecial.action";
import img1 from "../../assets/img/icons8-courier-80.png";
import img2 from "../../assets/img/icons8-handshake-80.png";
import img3 from "../../assets/img/icons8-sell-stock-80.png";
import img4 from "../../assets/img/icons8-shop-80.png";
import { getProductFilter, productsSpecial } from "api/products.api";
import { getProductFilterAction } from "../../redux/action/getProductFilter.action";

function Home(props) {
    const [category, setCategory] = useState([]);
    const [itemProduct, setItemProduct] = useState([]);
    const [special, setSpecial] = useState([{}, {}, {}]);
    const ref = useRef();

    const productFilter = useSelector(state => state.ProductFilter)
    const dispatch = useDispatch()
    
    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
        props.getSpecialProduct().then((res) => setSpecial(res));
        
        getProductFilter('Mobile').then(res => dispatch(getProductFilterAction(res)))
        // getProductFilter()
    }, [props]);
    console.log(productFilter);

    useEffect(() => {
        const arr = [];
        category.forEach((item) => {
            props.gtProductFilter(item.name).then((res) => {
                if (res.length) {
                    const obj = {
                        name: item.name,
                        items: res,
                    };
                    arr.push(obj);
                    setItemProduct([...itemProduct, ...arr]);
                }
            });
        });
    }, [category]);

    return (
        <Header>
            <div className={style.special_item}>
                <div className={style.firstItema}>
                    <figure>
                        {special[0].thumbnail ? (
                            <img
                                src={`http://localhost:3002/files/6fcf0852d383a5b8b4c757a18520da1d`}
                                alt="adsfasdf"
                            />
                        ) : null}
                    </figure>
                </div>
            </div>
            <div className={style.row_item}>
                <div className={style.box}>
                    <img src={img1} alt="" />
                    پشتیبانی 24 ساعته
                </div>
                <div className={style.box}>
                    <img src={img2} alt="" />
                    هفت روز گارانتی
                </div>
                <div className={style.box}>
                    <img src={img3} alt="" />
                    ارسال رایگان به تهران
                </div>
                <div className={style.box}>
                    <img src={img4} alt="" />
                    هشت سال سابقه درخشان
                </div>
            </div>
            <div className={style.container} ref={ref}>
                {itemProduct.map((item) => (
                    <div>
                        <Link to={`/${item.name}`}>{item.name}</Link>
                        <div className={style.row}>
                            {item.items.map((item) => (
                                <ProductItem
                                    price={item.price}
                                    product_name={item.name}
                                    id={item.id}
                                    category={item.category}
                                    img={item.thumbnail.split("_")[1]}
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
        gtProductFilter: (category) => dispatch(getProductsFil(category)),
        getSpecialProduct: () => dispatch(getSpecial()),
    };
};

const HomeRedux = connect(null, mapDispatchToProps)(Home);

export default HomeRedux;
