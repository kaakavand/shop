import React, { useEffect, useState } from "react";
import style from "../inventory.module.scss";

function ButtonInout(props) {
    const [input, setInput] = useState(false);

    const changEsc = (e) => {
        if (e.which === 27) {
            setInput(false);
        }
    };


    useEffect(() => {
        if (props.setRender) {
            setInput(false)
        }
    }, [props])
    

    return (
        <td onClick={() => setInput(true)} className={style.price}>
            {input ? (
                <input
                    type="text"
                    placeholder={props.placeholder}
                    name={`price_${props.name}`}
                    onKeyDown={changEsc}
                />
            ) : (
                <span className="span">{props.value}</span>
            )}
        </td>
    );
}

export default ButtonInout;
