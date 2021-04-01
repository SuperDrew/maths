import { Slider, Typography } from '@material-ui/core';
import React from 'react';

interface LabelledSliderProps {
    min: number;
    max: number;
    label: string;
    value: number;
    step: number;
    onChange(amount: number): void;
}

export const LabelledSlider = (props: LabelledSliderProps) => {
    const marks = [...Array(props.max - props.min + 2).keys()]
        .filter((key) => key >= props.min)
        .map((value) => ({
            value: value,
            label: value.toString(),
        }));

    return (
        <>
            <Typography id="discrete-slider-custom" gutterBottom>
                {props.label}
            </Typography>
            <Slider
                id={props.label}
                value={props.value}
                aria-labelledby="discrete-slider-custom"
                step={props.step}
                valueLabelDisplay="off"
                min={props.min}
                max={props.max}
                marks={marks}
                onChange={(event, value) => {
                    props.onChange(value as number);
                }}
            />
        </>
    );
};
