import React from "react";

function Pagination(props) {
    return (
        <ul>
            {props.array.map((item) => (
                <button
                    key={item}
                    value={item}
                    onClick={props.onClick}
                    className={props.className}
                ></button>
            ))}
        </ul>
    );
}

export default Pagination;
