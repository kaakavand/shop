import { Button } from "@mui/material";
import { HeaderPanel } from "layout";
import React from "react";
import InventoryList from "./components/InventoryList.component";
import style from "./inventory.module.scss";

function Inventory() {
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
                        [item]: data[item],
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
                        [item]: data[item],
                        id: item.split("_")[1],
                    };
                    price.push(priceItem);
                }
            }
        }

        document.querySelectorAll("input").forEach((element) => {
            element.style.display = "none";
        });
        document.querySelectorAll("span").forEach((element) => {
            element.style.display = "block";
        });

        console.log(data);
        console.log(price);
    };

    return (
        <HeaderPanel>
            <form className={style.container} onSubmit={setInfo}>
                <div className={style.row}>
                    <Button
                        variant="contained"
                        type="submit"
                        className={style.button}
                    >
                        ذخیره
                    </Button>
                    <h3>مدیریت موجودی و کالا ها</h3>
                </div>
                <InventoryList />
            </form>
        </HeaderPanel>
    );
}

export default Inventory;
