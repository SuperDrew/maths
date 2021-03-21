import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export const LabelledCheckBox = (props) =>
{
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        name={props.name}
                        color={props.color}
                    />
                }
                label={props.name}
                labelPlacement="start"
            />
        </>
    )
}