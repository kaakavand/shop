import { Button } from "@mui/material";
import { postProduct, upload } from "api/products.api";
import React, { useEffect, useState } from "react";
import style from "../productManage.module.scss";
import ButtonThumbnail from "./ButtonThumbnail.component";
import ButtonUpload from "./ButtonUpload.component";
import CreatableSingle from "./CreatableSingle.component";

function ModalAdd(props) {
    const [textArea, setTextArea] = useState("");
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);

    const addProduct = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        const categoryId = data.category.split("_")[1];
        const categoryName = data.category.split("_")[0];

        console.log(thumbnail[0]);

        const dataPost = {
            firstName: data.product,
            brand: data.brand,
            image: images,
            thumbnail: thumbnail[0],
            price: "0",
            count: 0,
            category: {
                id: categoryId,
                name: categoryName,
            },
            description: data.description,
        };


        
        
        console.log();
        
        // let dataURL = reader.result;
        // console.log(dataURL);
        // reader.readAsDataURL(thumbnail[0]);
        
        upload(new FileReader(thumbnail[0]))
        // postProduct(dataPost)
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
