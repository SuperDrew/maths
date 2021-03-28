import React, { useEffect, useState } from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import { Container, Grid, Icon, Paper, Typography } from '@material-ui/core';
import { LabelledSlider } from './components/LabelledSlider';
import { LabelledCheckBox } from './components/LabelledCheckBox';
import { QuestionTable } from './components/QuestionTable';
import { makeStyles, withStyles } from '@material-ui/styles';
import { generateRows } from './components/Generator';

const GlobalCss = withStyles({
    '@global': {
        'html, body': {
            backgroundColor: '#f5f5f5',
        },
    },
})(() => null);

const useStyles = makeStyles(() => ({
    control: {
        padding: 10,
    },
}));

function App() {
    const classes = useStyles();
    const min = 0;
    const [numberBond, setNumberBond] = useState(10);
    const [useAddition, setUseAddition] = useState(true);
    const [useSubtraction, setUseSubtraction] = useState(false);
    const [rows, setRows] = useState(generateRows(min, numberBond, useAddition));

    const updateNumberBond = (changedNumberBond: number) => {
        setNumberBond(changedNumberBond);
    };
    const updateAdditionUse = (additionUse: boolean) => {
        setUseAddition(additionUse);
    };
    const updateSubtractionUse = (subtractionUse: boolean) => {
        setUseSubtraction(subtractionUse);
    };

    useEffect(() => {
        setRows(generateRows(min, numberBond, useAddition));
    }, [min, numberBond, useAddition, useSubtraction]);

    return (
        <div className="App">
            <GlobalCss />
            <header className="App-header">
                <Typography variant="h1" align="center">
                    Maths
                </Typography>
            </header>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.control}>
                            <Grid item>
                                <LabelledSlider
                                    label="Number Bond"
                                    max={10}
                                    value={numberBond}
                                    step={1}
                                    onChange={updateNumberBond}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid item>
                            <Paper className={classes.control}>
                                <LabelledCheckBox
                                    name="addition"
                                    color="primary"
                                    value={useAddition}
                                    onChange={updateAdditionUse}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.control}>
                                <LabelledCheckBox
                                    name="subtraction"
                                    color="primary"
                                    value={useSubtraction}
                                    onChange={updateSubtractionUse}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item />
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                onClick={() => {
                                    setRows(generateRows(min, numberBond, useAddition));
                                }}
                            >
                                Generate maths fun!
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <QuestionTable label="Worksheet" rows={rows} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;