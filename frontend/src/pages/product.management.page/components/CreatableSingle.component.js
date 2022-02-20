import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import { gtProductId } from "redux/action/productId.action";

const CreatableSingle = (props) => {
    const [category, setCategory] = useState([]);
    const [flag, setFlag] = useState(false);
    const [idCategory, setIdCategory] = useState('');

    useEffect(() => {
        if (props.flag) {
            setFlag(true);
            props.getId(props.id).then(res => setIdCategory(res.category))
        }
    }, [props]);

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
    }, [props]);


    return (
        <>
            {flag ? (
                <select name="category" id="category">
                    {category.map((item) => (
                        <option value={`${item.name}_${item.id}`} id={item.id} selected= {item.name === idCategory ? true : false}>
                            {item.name}
                        </option>
                    ))}
                </select>
            ) : (
                <select name="category" id="category">
                    <option value="category">دسته بندی</option>
                    {category.map((item) => (
                        <option value={`${item.name}_${item.id}`} id={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            )}
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
