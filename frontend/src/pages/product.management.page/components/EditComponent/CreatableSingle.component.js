import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import { gtProductId } from "redux/action/productId.action";
import style from "../../productManage.module.scss";

const CreatableSingle = (props) => {
    const [category, setCategory] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idCategory, setIdCategory] = useState("");
    const [ulFlaf, setUlFlag] = useState(false);
    const [value, setValue] = useState("");
    const [id, setId] = useState(false);
    const ref = useRef();

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
        setId(props.id);
    }, [props]);

    useEffect(() => {
        if (id) {
            props.gtProduct(id).then((res) => setValue(res.category));
        }
    }, [id]);

    useEffect(() => {
        props.setCategoryProps(value);
    }, [value]);

    return (
        <>
            <div className={style.mainInput}>
                {ulFlaf ? (
                    <span onClick={() => setUlFlag(false)}>X</span>
                ) : (
                    <span onClick={() => setUlFlag(true)}>V</span>
                )}
                <input
                    type="text"
                    placeholder="دسته بندی"
                    ref={ref}
                    value={value}
                    onChange={({ target }) => {
                        setValue(target.value);
                    }}
                />
                {ulFlaf ? (
                    <ul>
                        {category.map((item) => (
                            <li
                                className={item.id}
                                onClick={(e) => {
                                    setValue(e.target.innerText);
                                    setUlFlag(false);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        gtCategory: (pageNum) => dispatch(getCategory(pageNum)),
        getId: (id) => dispatch(gtProductId(id)),
        gtProduct: (id) => dispatch(gtProductId(id)),
    };
};

const CreatableSingleRed = connect(null, mapDispatchToProps)(CreatableSingle);

export default CreatableSingleRed;
