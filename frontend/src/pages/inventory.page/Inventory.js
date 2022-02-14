import { Button } from "@mui/material";
import { editInventory, getProductId } from "api/products.api";
import { HeaderPanel } from "layout";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import InventoryList from "./components/InventoryList.component";
import style from "./inventory.module.scss";

function Inventory(props) {
    const [buttonValue, setButton] = useState(true);
    const [first, setfirst] = useState(false);

    const test = (e) => {
        if (e.target.className.includes("inventory_price")) {
            setButton(false)
        }
    };

    const setInfo = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        const amount = [];
        const price = [];

        for (const item in data) {
            if (data[item]) {
                if (item.split("_")[1] === "amount") {
                    const amountItem = {
                        [item.split("_")[1]]: data[item],
                        id: item.split("_")[2],
                    };
                    amount.push(amountItem);
                }
            }
        }

        for (const item in data) {
            if (data[item]) {
                if (item.split("_")[1] === "price") {
                    const priceItem = {
                        [item.split("_")[1]]: data[item],
                        id: item.split("_")[2],
                    };
                    price.push(priceItem);
                }
            }
        }

        amount.forEach((item) => {
            const id = item.id;
            const amount = item.amount;
            editInventory(id, { count: amount });
        });

        price.forEach((item) => {
            const id = item.id;
            const price = item.price;
            console.log(price);
            editInventory(id, { price: price });
        });

        setfirst(!first);
        setButton(true);
    };

    return (
        <HeaderPanel>
            <form
                className={style.container}
                onSubmit={setInfo}
                autocomplete="off"
                onClick={test}
            >
                <div className={style.row}>
                    <h3>مدیریت موجودی و کالا ها</h3>
                    <Button
                        variant="contained"
                        type="submit"
                        className={style.button}
                        disabled={buttonValue}
                    >
                        ذخیره
                    </Button>
                </div>
                <InventoryList setRender={first} />
            </form>
        </HeaderPanel>
    );
}

export default Inventory;
