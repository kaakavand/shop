import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import style from "../../productManage.module.scss";
import { useEffect } from "react";
import { upload } from "api/products.api";

const Input = styled("input")({
    display: "none",
});

export default function UploadButtons(props) {
    const [images, setImages] = useState([]);

    const imagesSet = async (event) => {
        console.log(event.target.files[0]);
        let formD = new FormData();
        formD.append("image", event.target.files[0]);
        formD.append("name", event.target.files[0].name);

        await upload(formD).then((res) => {
            const data = res.originalname + "_" + res.filename;
            setImages([...images , data]);
        });
    };

    useEffect(() => {
        props.addImagesArr(images)
        console.log(images);
    }, [images]);

    const removeIMG = (event) => {
        const newArr = [];
        images.forEach((item) => {
            if (event.target.className !== item.split('_')[0]) {
                newArr.push(item);
            }
        });
        setImages(newArr);
    };

    return (
        <>
            <div className={style.row_images}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            name="image"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={imagesSet}
                        />
                        <Button variant="contained" component="span">
                            تصاویر
                        </Button>
                    </label>
                </Stack>
                <div style={{ display: "flex" }}>
                    {images.map((item) => (
                        <figure>
                            <img
                                src={`http://localhost:3002/files/${item.split('_')[1]}`}
                                alt={item.split('_')[0]}
                            />
                            <span className={item.split('_')[0]} onClick={removeIMG}>
                                x
                            </span>
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
}
