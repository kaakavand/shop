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
    const ref = useRef()
    // useEffect(() => {
    //         props.getId(props.id).then((res) => setIdCategory(res.category));
    // }, [props]);

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
    }, [props]);

    const setValueInputs = (e) => {
        const obj = {
            name : e.target.innerText,
            id : e.target.className
        }
        ref.current.value = obj.name

        props.setCategoryProps(ref.current.value)
    }



    return (
        <>
            <div className={style.mainInput}>
                {ulFlaf ? (
                    <span onClick={() => setUlFlag(false)}>X</span>
                ) : (
                    <span onClick={() => setUlFlag(true)}>V</span>
                )}
                <input type="text" ref={ref} onChange={() => props.setCategoryProps(ref.current.value)}/>
                {ulFlaf ? (
                    <ul>
                        {category.map((item) => (
                            <li className={item.id} onClick={setValueInputs}>{item.name}</li>
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
    };
};

const CreatableSingleRed = connect(null, mapDispatchToProps)(CreatableSingle);

export default CreatableSingleRed;
