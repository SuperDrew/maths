import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Grid,
    Icon,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { LabelledSlider } from './components/LabelledSlider';
import { LabelledCheckBox } from './components/LabelledCheckBox';
import { QuestionTable } from './components/QuestionTable';
import { makeStyles, withStyles } from '@material-ui/styles';
import { generateRows } from '../core/generator/Generator';

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

const initialState = {
    numberBonds: 10,
    maxNumberBond: 20,
    useExactNumberBonds: true,
    numberOfRows: 5,
    useAddition: true,
    useSubtraction: true,
};

function App() {
    const classes = useStyles();
    const min = 0;
    const [numberBond, setNumberBond] = useState(initialState.numberBonds);
    const [maxNumberBond, setMaxNumberBond] = useState(initialState.maxNumberBond);
    const [useExactNumberBonds, setUseExactNumberBonds] = useState(initialState.useExactNumberBonds);
    const [numberOfRows, setNumberRows] = useState(initialState.numberOfRows);
    const [useAddition, setUseAddition] = useState(initialState.useAddition);
    const [useSubtraction, setUseSubtraction] = useState(initialState.useSubtraction);
    const [rows, setRows] = useState(
        generateRows({ min, numberBond, useAddition, useSubtraction, useExactNumberBonds }, numberOfRows)
    );

    const updateNumberBond = (changedNumberBond: number) => {
        setNumberBond(changedNumberBond);
    };
    const updateMaxNumberBond = (changedMaxNumberBond: string) => {
        const num = parseInt(changedMaxNumberBond);
        setMaxNumberBond(num);
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
                                    max={maxNumberBond}
                                    value={numberBond}
                                    step={1}
                                    onChange={updateNumberBond}
                                />
                            </Grid>
                            <Accordion>
                                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <Typography>Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container alignItems={'center'} justify="center" spacing={2}>
                                        <Grid item>
                                            <Paper className={classes.control}>
                                                <LabelledCheckBox
                                                    name="Use exact Number Bonds"
                                                    color="primary"
                                                    value={useExactNumberBonds}
                                                    onChange={updateUseExactNumberBonds}
                                                />
                                            </Paper>
                                        </Grid>
                                        <Grid item>
                                            <Paper className={classes.control}>
                                                <TextField
                                                    type="number"
                                                    label="Maximum Number Bonds"
                                                    variant="standard"
                                                    value={maxNumberBond}
                                                    onChange={(event) => updateMaxNumberBond(event.target.value)}
                                                />
                                            </Paper>
                                        </Grid>
                                        <Grid item>
                                            <Paper className={classes.control}>
                                                <TextField
                                                    type="number"
                                                    label="number of rows"
                                                    variant="standard"
                                                    value={numberOfRows}
                                                    onChange={(event) => updateNumberRows(event.target.value)}
                                                />
                                            </Paper>
                                        </Grid>
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
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>

                    <Grid item />
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                endIcon={<Icon>refresh</Icon>}
                                onClick={() => {
                                    setRows(
                                        generateRows(
                                            { min, numberBond, useAddition, useSubtraction, useExactNumberBonds },
                                            numberOfRows
                                        )
                                    );
                                }}
                            >
                                Generate another worksheet
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
