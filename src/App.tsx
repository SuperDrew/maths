import React, { useEffect, useState } from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import { Container, Grid, Icon, Paper, TextField, Typography } from '@material-ui/core';
import { LabelledSlider } from './components/LabelledSlider';
import { LabelledCheckBox } from './components/LabelledCheckBox';
import { QuestionTable } from './components/QuestionTable';
import { makeStyles, withStyles } from '@material-ui/styles';
import { generateRows } from './components/Generator';

const GlobalCss = withStyles({
    '@global': {
        'html, body': {
            // TODO how do I use the theme for this color? backgroundColor: theme.palette.background.paper
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
    const [useExactNumberBonds, setUseExactNumberBonds] = useState(true);
    const [numberOfRows, setNumberRows] = useState(5);
    const [useAddition, setUseAddition] = useState(true);
    const [useSubtraction, setUseSubtraction] = useState(true);
    const [rows, setRows] = useState(
        generateRows({ min, numberBond, useAddition, useSubtraction, useExactNumberBonds }, numberOfRows)
    );

    const updateNumberBond = (changedNumberBond: number) => {
        setNumberBond(changedNumberBond);
    };
    const updateNumberRows = (changedNumberRows: string) => {
        const num = parseInt(changedNumberRows);
        setNumberRows(num);
    };
    const updateUseExactNumberBonds = (exactNumberBondsUse: boolean) => {
        setUseExactNumberBonds(exactNumberBondsUse);
    };
    const updateAdditionUse = (additionUse: boolean) => {
        setUseAddition(additionUse);
    };
    const updateSubtractionUse = (subtractionUse: boolean) => {
        setUseSubtraction(subtractionUse);
    };

    useEffect(() => {
        setRows(generateRows({ min, numberBond, useAddition, useSubtraction, useExactNumberBonds }, numberOfRows));
    }, [min, numberBond, numberOfRows, useAddition, useSubtraction, useExactNumberBonds]);

    return (
        <div className="App">
            <GlobalCss />
            <header className="App-header" data-testid="header">
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
                                    label="Number Bonds"
                                    min={1}
                                    max={10}
                                    value={numberBond}
                                    step={1}
                                    onChange={updateNumberBond}
                                />
                            </Grid>
                            <Grid container alignItems={'center'}>
                                <Grid item>
                                    <LabelledCheckBox
                                        name="Use exact Number Bonds"
                                        color="primary"
                                        value={useExactNumberBonds}
                                        onChange={updateUseExactNumberBonds}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        type="number"
                                        label="number of rows"
                                        variant="outlined"
                                        value={numberOfRows}
                                        onChange={(event) => updateNumberRows(event.target.value)}
                                    />
                                </Grid>
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
                                    setRows(
                                        generateRows(
                                            { min, numberBond, useAddition, useSubtraction, useExactNumberBonds },
                                            numberOfRows
                                        )
                                    );
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
