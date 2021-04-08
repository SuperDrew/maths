import { Grid, Paper, TextField } from '@material-ui/core';
import { LabelledCheckBox } from './LabelledCheckBox';
import React from 'react';
import { makeStyles } from '@material-ui/styles';


export type Setting = NumberSetting | BooleanSetting;
export interface NumberSetting {
    name: string;
    initialValue: number;
    onChange: (newValue: number) => void;
    type: 'number'
}

export interface BooleanSetting {
    name: string;
    initialValue: boolean;
    onChange: (newValue: boolean) => void;
    type: 'checkbox'
}

interface SettingsProps<T> {
    values: Setting[]
}

const useStyles = makeStyles(() => ({
    control: {
        padding: 10,
    },
}));

export const Settings = <T, >({ values }: SettingsProps<T>) => {
    const classes = useStyles();
    const items = values.map((value, index) => {
        if (value.type === 'checkbox') {
            return <Grid item key={index}>
                <Paper className={classes.control}>
                    <LabelledCheckBox
                        name={value.name}
                        color='primary'
                        value={value.initialValue}
                        onChange={value.onChange}
                    />
                </Paper>
            </Grid>;
        } else {
            return <Grid item key={index}>
                <Paper className={classes.control}>
                    <TextField
                        type='number'
                        label={value.name}
                        variant='standard'
                        value={value.initialValue}
                        onChange={(event) => value.onChange(parseInt(event.target.value))}
                    />
                </Paper>
            </Grid>;
        }

    });
    return (
        <Grid container alignItems={'center'} justify='center' spacing={2}>
            {items}
        </Grid>);
};
