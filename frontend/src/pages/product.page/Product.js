import { Header } from "layout";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { gtProductId } from "redux/action/productId.action";
import style from "./product.module.scss";

function Product(props) {
    const ref = useRef();
    const [first, setfirst] = useState({});
    const [number, setNumber] = useState(1);
    const [flag, setFlag] = useState(false);
    const [flagCart, setFlagCart] = useState(true);

    const [flagImg, setFlagImg] = useState(false);
    const [img, setImg] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        props.gtProduct(params.id).then((res) => setfirst(res));
    }, [flagCart]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cart_item"))) {
            JSON.parse(localStorage.getItem("cart_item")).forEach((item) => {
                if (item.id === params.id) {
                    setFlagCart(false);
                }
                console.log(item);
            });
        }
    }, [flagCart]);

    console.log(first);

    const counterSum = () => {
        let value = +ref.current.value;
        if (value < +first.count) {
            setNumber(number + 1);
            setFlag(!flag);
        }
    };

    const counterSub = () => {
        let value = +ref.current.value;
        if (value > 1) {
            setNumber(number - 1);
            setFlag(!flag);
        }
    };

    const addToCart = () => {
        const obj = {
            price: first.price,
            number: number,
            name: first.name,
            id: params.id,
        };

        let ls = JSON.parse(localStorage.getItem("cart_item"));
        let arr;

        if (ls) {
            arr = JSON.parse(localStorage.getItem("cart_item"));
            arr.push(obj);
            localStorage.setItem("cart_item", JSON.stringify(arr));
        } else {
            arr = [];
            arr.push(obj);
            localStorage.setItem("cart_item", JSON.stringify(arr));
        }
        setFlag(!flag);
        setFlagCart(false);
        setNumber(1);
    };

    console.log(img);

    return (
        <Header flag={flag}>
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
                                              onClick={(e) => {
                                                  setImg(e.target.src);
                                                  setFlagImg(true);
                                              }}
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
                        {flagCart ? (
                            <>
                                <div className={style.counter}>
                                    <button onClick={counterSum}>+</button>
                                    <input
                                        type="number"
                                        value={number}
                                        ref={ref}
                                    />
                                    <button onClick={counterSub}>-</button>
                                </div>
                                <button
                                    className={style.cartAdd}
                                    onClick={addToCart}
                                >
                                    افزودن به سبد خرید
                                </button>
                            </>
                        ) : (
                            <button
                                className={style.cartAdd}
                                onClick={() => navigate("/cart")}
                                style={{
                                    background: "#ffdad8",
                                    color: "#f44336",
                                    border: "1px solid #ffdad8",
                                }}
                            >
                                مشاهده سبد خرید
                            </button>
                        )}
                    </div>
                </div>
                <div
                    style={{
                        borderTop: "1px solid #eeeeee",
                        marginTop: "20px",
                        padding: "20px 10px",
                    }}
                >
                    <h5 style={{ fontSize: "21px", color: "#072227" }}>
                        توضیحات محصول :
                    </h5>
                    <p>{first.description}</p>
                </div>
            </div>

            {flagImg ? (
                <section onClick={() => setFlagImg(false)}>
                    <figure>
                        <img src={`${img}`} alt="" />
                    </figure>
                </section>
            ) : null}
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
