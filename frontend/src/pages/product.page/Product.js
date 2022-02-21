import { Header } from "layout";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { gtProductId } from "redux/action/productId.action";
import style from "./product.module.scss";

function Product(props) {
    const ref = useRef();
    const [first, setfirst] = useState({});

    useEffect(() => {
        props.gtProduct("1").then((res) => setfirst(res));
    }, []);

    console.log(first);

    const counterSum = () => {
        let value = +ref.current.value;
        if (value < +first.count) {
            ref.current.value = value + 1;
        }
    };

    const counterSub = () => {
        let value = +ref.current.value;
        if (value > 1) {
            ref.current.value = value - 1;
        }
    };

    return (
        <Header>
            <div className={style.container}>
                <div className={style.main_content}>
                    <div className={style.img_box}>
                        <figure>
                            {first.thumbnail ? (
                                <img
                                    src={`http://localhost:3002/files/${
                                        first.thumbnail.split("_")[1]
                                    }`}
                                    alt=""
                                />
                            ) : null}
                        </figure>
                        <div className={style.galery}>
                            {first.image
                                ? first.image.map((item) => (
                                      <figure>
                                          <img
                                              src={`http://localhost:3002/files/${
                                                  item.split("_")[1]
                                              }`}
                                              alt=""
                                          />
                                      </figure>
                                  ))
                                : null}
                        </div>
                    </div>
                    <div className={style.info_box}>
                        <h1>{first.name}</h1>
                        <h3>
                            {first.brand} /{" "}
                            <Link to={`/${first.category}`}>
                                {first.category}
                            </Link>
                        </h3>
                        <p>{first.price} تومان</p>
                        <div className={style.counter}>
                            <button onClick={counterSum}>+</button>
                            <input type="number" value={1} ref={ref} />
                            <button onClick={counterSub}>-</button>
                        </div>
                        <button className={style.cartAdd}>
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
                <p>{first.description}</p>
            </div>
        </Header>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProduct: (id) => dispatch(gtProductId(id)),
    };
};

const ProductRed = connect(null, mapDispatchToProps)(Product);

export default ProductRed;
