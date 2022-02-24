import { Button } from "@mui/material";
import { postProduct, upload } from "api/products.api";
import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import style from "../../productManage.module.scss";
import ButtonThumbnail from "./ButtonThumbnail.component";
import ButtonUpload from "./ButtonUpload.component";
import CreatableSingle from "./CreatableSingle.component";
import FormData from "form-data";
import { connect } from "react-redux";
import { getCategory } from "redux/action/caregory.action";
import { postCategory } from "api/categoty.api";

function ModalAdd(props) {
    const [textArea, setTextArea] = useState("");
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [arr, setArr] = useState([]);
    const [res, setRes] = useState([]);
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        setRes([...res, ...arr]);
    }, [arr]);

    useEffect(() => {
        props.gtCategory().then((res) => setAllCategory(res));
    }, []);

    const addProduct = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        const dataPost = {
            name: data.product,
            brand: data.brand,
            image: images,
            thumbnail: "",
            price: "0",
            count: "5000",
            category: category,
            idCategory: "",
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

            allCategory.forEach((item) => {
                if (item.name === dataPost.category) {
                    dataPost.idCategory = item.id;
                }
            });

            if (!dataPost.idCategory) {
                const obj = {
                    name : dataPost.category
                }
                postCategory(obj).then(res => {
                    dataPost.idCategory = res.id
                    dataPost.category = res.name
                })
            }
        
            postProduct(dataPost);
            props.setModalAdd();
            console.log(dataPost);
            props.reRender()
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

                    <CreatableSingle
                        setCategoryProps={(value) => setCategory(value)}
                    />

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

const mapDispatchToProps = (dispatch) => {
    return {
        gtCategory: () => dispatch(getCategory()),
        // getId: (id) => dispatch(gtProductId(id)),
    };
};

const ModalAddRed = connect(null, mapDispatchToProps)(ModalAdd);

export default ModalAddRed;
