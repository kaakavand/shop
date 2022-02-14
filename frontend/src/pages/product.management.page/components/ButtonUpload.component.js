import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import style from "../productManage.module.scss";
import { useEffect } from "react";

const Input = styled("input")({
    display: "none",
});

export default function UploadButtons(props) {
    const [images, setImages] = useState([]);

    const imagesSet = (event) => {
        setImages([...images, event.target.files[0]]);
    };

    useEffect(() => {
        props.addImagesArr(images)
    }, [images])
    

    const removeIMG = (event) => {
        event.target.parentElement.remove()
        const name = event.target.className;
        let arr;
        images.forEach((item, index) => {
            if (item.name === name) {
                let newState = images;
                newState.splice(index, 1);
                arr = newState;
            }
        });
        setImages(arr);
    };

    return (
        <>
            <div className={style.row_images}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
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
                                src={URL.createObjectURL(item)}
                                alt={item.name}
                            />
                            <span className={item.name} onClick={removeIMG}>
                                x
                            </span>
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
}
