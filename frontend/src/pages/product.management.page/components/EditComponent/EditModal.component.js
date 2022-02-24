import React, { useEffect, useState } from "react";
import style from "../../productManage.module.scss";
import ButtonUpload from "./ButtonUpload.component";
import ButtonThumbnail from "./ButtonThumbnail.component";
import { connect } from "react-redux";
import { gtProductId } from "redux/action/productId.action";
import { Button } from "@mui/material";
import { editInventory, getProductId } from "api/products.api";


function EditModal(props) {
    const [id, setId] = useState(false);
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setId(props.id);
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

    const dataPost = {
        name: name,
        brand: brand,
        image: images,
        thumbnail: thumbnail[0],
        // category: categoryName,
        // idCategory: categoryId,
        description: description,
    };

    const submitForm = () => {
        editInventory(id , dataPost)
    }

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
                        <textarea
                            name="description"
                            value={brand}
                            onChange={({ target }) => setDescription(target.value)}
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
    };
};

const EditModalRed = connect(null, mapDispatchToProps)(EditModal);

export default EditModalRed;
