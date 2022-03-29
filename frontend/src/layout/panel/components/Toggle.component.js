import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { PATHS } from "config/routs.config";
import style from '../panel.module.scss'

export default function ColorToggleButton() {
    const [alignment, setAlignment] = React.useState(PATHS.PRODUCTS_MANAGE);

    useEffect(() => {
        setAlignment(window.location.pathname)
    }, []);
    
    
    let navigate = useNavigate();
    const changURL = ({target}) => {
        navigate(target.value);
    }

    return (
        <ToggleButtonGroup
            color="primary"
            className={style.toggle}
            value={alignment}
            exclusive
        >
            <ToggleButton onClick={changURL} className={style.Button} value={PATHS.ORDERS}>سفارش ها</ToggleButton>
            <ToggleButton onClick={changURL} className={style.Button_special} value={PATHS.INVENTORY}>موجودی و قیمت ها</ToggleButton>
            <ToggleButton onClick={changURL} className={style.Button} value={PATHS.PRODUCTS_MANAGE}>کالا ها</ToggleButton>
        </ToggleButtonGroup>
    );
}
