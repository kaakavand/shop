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
        const obj = {
            name : event.target.files[0].name,
            input : event.target,
            file : event.target.files[0]
        }
        setImages([...images , obj])
    };

    useEffect(() => {
        props.addImagesArr(images)
    }, [images])
    

    const removeIMG = (event) => {
        const newArr = []
        images.forEach((item) => {
            if (event.target.className !== item.name) {
                newArr.push(item)
            }
        });
        setImages(newArr)
    };


    return (
        <>
            <div className={style.row_images}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            name = 'image'
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
                                src={URL.createObjectURL(item.file)}
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
