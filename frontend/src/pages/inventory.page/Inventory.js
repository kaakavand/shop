import { Button } from "@mui/material";
import { HeaderPanel } from "layout";
import React from "react";
import { useState } from "react";
import InventoryList from "./components/InventoryList.component";
import style from "./inventory.module.scss";

function Inventory() {
    const [spans, setSpans] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [buttonValue, setButton] = useState(true);
    

    const setInfo = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        const amount = [];
        const price = [];

        for (const item in data) {
            if (data[item]) {
                if (item.split("_")[0] === "amount") {
                    const amountItem = {
                        [item.split("_")[0]]: data[item],
                        id: item.split("_")[1],
                    };
                    amount.push(amountItem);
                }
            }
        }

        for (const item in data) {
            if (data[item]) {
                if (item.split("_")[0] === "price") {
                    const priceItem = {
                        [item.split("_")[0]]: data[item],
                        id: item.split("_")[1],
                    };
                    price.push(priceItem);
                }
            }
        }

        inputs.forEach(element => {element.style.display='none'});
        spans.forEach(element => {element.style.display='block'});
        setSpans([])
        setInputs([])

        console.log(amount);
        console.log(price);
        setButton(true)

    };

    return (
        <HeaderPanel>
            <form className={style.container} onSubmit={setInfo}>
                <div className={style.row}>
                    <Button
                        variant="contained"
                        type="submit"
                        className={style.button}
                        disabled={buttonValue}
                    >
                        ذخیره
                    </Button>
                    <h3>مدیریت موجودی و کالا ها</h3>
                </div>
                <InventoryList
                    spanAddToParent={(span) => {
                        setSpans([...spans , ...span])
                        setButton(false)
                    }}
                    inputAddToParent={(input) => setInputs([...inputs , ...input])}
                    setArrDisablesButton={(item) => setButton(item)}
                />
            </form>
        </HeaderPanel>
    );
}

export default Inventory;
