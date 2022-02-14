import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";

const CreatableSingle = (props) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        props.gtCategory().then((res) => setCategory(res));
    }, [props]);

    return (
        <select name="category" id="category">
            <option value='category'>دسته بندی</option>
            {category.map((item) => (
                <option value={`${item.name}_${item.id}`} id={item.id}>{item.name}</option>
            ))}
        </select>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        gtCategory: (pageNum) => dispatch(getCategory(pageNum)),
    };
};

const CreatableSingleRed = connect(null, mapDispatchToProps)(CreatableSingle);

export default CreatableSingleRed;
