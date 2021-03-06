import { Button } from "@mui/material";
import { Header } from "layout";
import React, { useState, useRef } from "react";
// import MyComponent from './DatePicker.component';
import style from "../cart.module.scss";
// import DatePicker from "./DatePicker.component";
// import AppDate from "./DatePicker.component";

function List() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [adress, setAdress] = useState("");
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const form = useRef();

    const submit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            lastName: lastName,
            adress: adress,
            code: code,
            phone: phone,
            date: date,
        };

        if (
            data.name &&
            data.lastName &&
            data.adress &&
            data.code &&
            data.phone &&
            data.date
        ) {
            localStorage.setItem("user", JSON.stringify(data));
            let total = 0;
            JSON.parse(localStorage.getItem("cart_item")).forEach((item) => {
                total += +item.price * item.number;
            });
            form.current.style.boxShadow = "none";

            console.log(total);
            window.location.href = `http://127.0.0.1:5500/payment/?${total}`;
        } else {
            form.current.style.boxShadow = "rgb(244 67 54) 0px 0px 5px 0.25rem";
        }
    };

    return (
        <Header>
            <form onSubmit={submit} className={style.form_list} ref={form}>
                <h3>اطلاعات تماس و ارسال :</h3>
                <div className={style.input_box}>
                    <div className={style.row}>
                        <label>
                            نام :
                            <input
                                onChange={({ target }) => setName(target.value)}
                                name="name"
                                type="text"
                                placeholder="امیرحسین"
                            />
                        </label>
                        <label>
                            نام خانوادگی :
                            <input
                                onChange={({ target }) =>
                                    setLastName(target.value)
                                }
                                name="lastName"
                                type="text"
                                placeholder="کاکاوند"
                            />
                        </label>
                    </div>
                    <div className={style.row}>
                        <label>
                            آدرس :
                            <input
                                onChange={({ target }) =>
                                    setAdress(target.value)
                                }
                                name="adress"
                                type="text"
                                placeholder="تهران , رسالت"
                            />
                        </label>
                        <label>
                            کد پستی :
                            <input
                                onChange={({ target }) => setCode(target.value)}
                                name="code"
                                type="number"
                                placeholder="123456789"
                            />
                        </label>
                    </div>
                    <div className={style.row}>
                        <label>
                            تلفن همراه :
                            <input
                                onChange={({ target }) =>
                                    setPhone(target.value)
                                }
                                name="phone"
                                type="number"
                                placeholder="09918547952"
                            />
                        </label>
                        <label>
                            تاریخ تحویل :
                            <input
                                onChange={({ target }) => setDate(target.value)}
                                name="date"
                                type="date"
                                placeholder="1400/12/23"
                            />
                        </label>
                    </div>
                    {/* <AppDate /> */}
                    <div style={{textAlign : 'center'}}>
                        {" "}
                        <Button type="submit" variant="contained">
                            پرداخت
                        </Button>
                    </div>
                </div>
            </form>
        </Header>
    );
}

export default List;
