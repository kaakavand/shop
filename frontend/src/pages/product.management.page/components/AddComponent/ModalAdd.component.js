import { Button } from "@mui/material";
import { postProduct, upload } from "api/products.api";
import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import style from "../../productManage.module.scss";
import ButtonThumbnail from "./ButtonThumbnail.component";
import ButtonUpload from "./ButtonUpload.component";
import CreatableSingle from "./CreatableSingle.component";
import FormData from "form-data";

function ModalAdd(props) {
    const [textArea, setTextArea] = useState("");
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [arr, setArr] = useState([]);
    const [res, setRes] = useState([]);

    console.log(thumbnail);

    useEffect(() => {
        setRes([...res, ...arr]);
    }, [arr]);

    const addProduct = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        const categoryId = data.category.split("_")[1];
        const categoryName = data.category.split("_")[0];
        // let arr = []

        const dataPost = {
            name: data.product,
            brand: data.brand,
            image: images,
            thumbnail: "",
            price: "0",
            count: "5000",
            category: categoryName,
            idCategory: categoryId,
            description: data.description,
            amount: "520",
        };

        (async () => {
            let formD = new FormData();
            formD.append("image", thumbnail[0].file);
            formD.append("name", thumbnail[0].name);

            await upload(formD).then((res) => {
                dataPost.thumbnail = res.originalname + "_" + res.filename;
            });
            postProduct(dataPost);
            props.setModalAdd();
        })();
    };

    return (
        <>
            <div className={style.modal_box}>
                <form onSubmit={addProduct}>
                    <div className={style.row}>
                        <h2>افزودن کالا</h2>
                        <span
                            className={style.remover}
                            onClick={props.setModalAdd}
                        >
                            X
                        </span>
                    </div>
                    <ButtonUpload addImagesArr={(value) => setImages(value)} />
                    <ButtonThumbnail
                        addtThumbnail={(value) => setThumbnail(value)}
                    />

                    <input name="product" type="text" placeholder="نام کالا" />
                    <input name="brand" type="text" placeholder=" برند" />

                    <CreatableSingle />

                    <textarea name="description"></textarea>
                    <Button
                        type="submit"
                        className={style.button}
                        variant="contained"
                    >
                        ذخیره
                    </Button>
                </form>
            </div>
        </>
    );
}

export default ModalAdd;
