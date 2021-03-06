import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import style from "../../productManage.module.scss";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useEffect } from "react";

const Input = styled("input")({
    display: "none",
});

export default function ButtonThumbnail(props) {
    const [thumbnail, setThumbnail] = useState([]);

    const imagesSet = (event) => {
        const obj = {
            name : event.target.files[0].name,
            input : event.target,
            file : event.target.files[0]
        }
        setThumbnail([obj]);
    };

    useEffect(() => {
        props.addtThumbnail(thumbnail);
    }, [thumbnail]);

    const removeIMG = (event) => {
        const newArr = []
        thumbnail.forEach((item) => {
            if (event.target.className !== item.name) {
                newArr.push(item)
            }
        });
        setThumbnail(newArr);
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
                            name='image'
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
