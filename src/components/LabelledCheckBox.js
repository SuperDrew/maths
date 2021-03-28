import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const LabelledCheckBox = (props) => {
    return (
        <>
            <FormControlLabel
                control={<Checkbox name={props.name} color={props.color} value={props.value} />}
                label={props.name}
                labelPlacement="start"
                onChange={(event, checked) => props.onChange(!checked)}
            />
        </>
    );
};
