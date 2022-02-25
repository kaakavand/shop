import React, { useEffect, useState } from "react";
import style from "../../productManage.module.scss";
import ButtonUpload from "./ButtonUpload.component";
import ButtonThumbnail from "./ButtonThumbnail.component";
import { connect } from "react-redux";
import { gtProductId } from "redux/action/productId.action";
import { Button } from "@mui/material";
import { editInventory, getProductId, upload } from "api/products.api";
import CreatableSingle from "../EditComponent/CreatableSingle.component";
import { getCategory } from "redux/action/caregory.action";
import { postCategory } from "api/categoty.api";

function EditModal(props) {
    const [id, setId] = useState(false);
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        setId(props.id);
        props.gtCategory().then((res) => setAllCategory(res));
    }, []);

    useEffect(() => {
        if (id) {
            props.gtProduct(id).then((res) => {
                setName(res.name);
                setBrand(res.brand);
                setDescription(res.description);
            });
        }
    }, [id]);

    console.log(category);

    const submitForm = (e) => {
        e.preventDefault()
        const dataPost = {
            name: name,
            brand: brand,
            image: images,
            thumbnail: thumbnail[0],
            category: category,
            idCategory: "",
            description: description,
        };
        (async () => {
            allCategory.forEach((item) => {
                if (item.name === dataPost.category) {
                    dataPost.idCategory = item.id;
                }
            });

            if (!dataPost.idCategory) {
                const obj = {
                    name: dataPost.category,
                };
                postCategory(obj).then((res) => {
                    dataPost.idCategory = res.id;
                    dataPost.category = res.name;
                });
            }

            editInventory(id, dataPost);
            props.setModalEdit()
            console.log(dataPost);
            props.reRender()
        })();
    };

    return (
        <>
            {id ? (
                <div className={style.modal_box}>
                    <form onSubmit={submitForm}>
                        <div className={style.row2}>
                            <h2>ویرایش کالا</h2>
                            <span
                                className={style.remover}
                                onClick={props.setModalEdit}
                            >
                                X
                            </span>
                        </div>
                        <ButtonUpload
                            id={id}
                            addImagesArr={(value) => setImages(value)}
                        />
                        <ButtonThumbnail
                            id={id}
                            addtThumbnail={(value) => setThumbnail(value)}
                        />
                        <input
                            name="product"
                            type="text"
                            placeholder="نام کالا"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                        <input
                            name="brand"
                            type="text"
                            placeholder=" برند"
                            value={brand}
                            onChange={({ target }) => setBrand(target.value)}
                        />

                        <CreatableSingle
                            id={id}
                            setCategoryProps={(value) => setCategory(value)}
                        />

                        <textarea
                            name="description"
                            placeholder="توضیحات محصول"
                            value={description}
                            onChange={({ target }) =>
                                setDescription(target.value)
                            }
                        ></textarea>
                        <Button
                            type="submit"
                            className={style.button}
                            variant="contained"
                        >
                            ذخیره
                        </Button>
                    </form>
                </div>
            ) : null}
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProduct: (pageNum) => dispatch(gtProductId(pageNum)),
        gtCategory: () => dispatch(getCategory()),
    };
};

const EditModalRed = connect(null, mapDispatchToProps)(EditModal);

export default EditModalRed;
