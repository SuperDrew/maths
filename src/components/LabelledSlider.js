import {Slider, Typography} from "@material-ui/core";
import React from "react";

export const LabelledSlider = (props) =>
{
    const marks = [...Array(props.max +1).keys()].map((value) => ({value: value, label: value.toString()}))

    return (
        <>
            <Typography id="discrete-slider-custom" gutterBottom>
                {props.label}
            </Typography>
            <Slider
                id={props.label}
                defaultValue={props.defaultValue}
                aria-labelledby="discrete-slider-custom"
                step={props.step}
                valueLabelDisplay="off"
                min={0}
                max={props.max}
                marks={marks}
                onChange={
                        (event, value) => {
                            props.onChange(value)
                    }
                }
            />
        </>
    )
}