import React from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';

interface LabelledCheckBoxProps {
    name: string;
    color: CheckboxProps['color'];
    value: boolean;
    onChange(checked: boolean): void;
}
export const LabelledCheckBox = (props: LabelledCheckBoxProps) => {
    return (
        <>
            <FormControlLabel
                control={<Checkbox name={props.name} color={props.color} checked={props.value} />}
                label={props.name}
                labelPlacement="end"
                onChange={(event, checked) => props.onChange(checked)}
            />
        </>
    );
};
