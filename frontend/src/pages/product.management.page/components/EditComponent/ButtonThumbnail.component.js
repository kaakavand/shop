import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import style from "../../productManage.module.scss";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { gtProductId } from "redux/action/productId.action";
import { upload } from "api/products.api";

const Input = styled("input")({
    display: "none",
});

function ButtonThumbnail(props) {
    const [thumbnail, setThumbnail] = useState([]);

    const [id, setId] = useState(false);

    useEffect(() => {
        setId(props.id);
    }, [props]);

    useEffect(() => {
        props.addtThumbnail(thumbnail);
    }, [thumbnail]);

    useEffect(() => {
        if (id) {
            props
                .gtProduct(id)
                .then((res) => setThumbnail([...thumbnail, res.thumbnail]));
        }
    }, [id]);


    const imagesSet = async (event) => {
        let formD = new FormData();
        formD.append("image", event.target.files[0]);
        formD.append("name", event.target.files[0].name);
        await upload(formD).then((res) => {
            const data = res.originalname + "_" + res.filename;
            setThumbnail([data]);
        });
    };

    const removeIMG = (event) => {
        setThumbnail([]);
    };

    return (
        <>
            <div className={style.row_thumbnail}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-file">
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={imagesSet}
                            name="image"
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Stack>
                <div
                    className={style.thumbnail_box}
                    style={{ display: "flex" }}
                >
                    {thumbnail.map((item) => (
                        <figure>
                            <img
                                src={`http://localhost:3002/files/${
                                    item.split("_")[1]
                                }`}
                                alt={item.split("_")[0]}
                            />
                            <span
                                className={item.split("_")[0]}
                                onClick={removeIMG}
                            >
                                x
                            </span>
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        gtProduct: (id) => dispatch(gtProductId(id)),
    };
};

const ButtonThumbnailRed = connect(null, mapDispatchToProps)(ButtonThumbnail);

export default ButtonThumbnailRed;
