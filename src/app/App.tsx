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
    Typography
} from '@material-ui/core';
import { LabelledSlider } from './components/LabelledSlider';
import { QuestionTable } from './components/QuestionTable';
import { makeStyles, withStyles } from '@material-ui/styles';
import { generateRows } from '../core/generator/Generator';
import { Setting, Settings } from './components/Settings';

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

    useEffect(() => {
        setRows(generateRows({ min, numberBond, useAddition, useSubtraction, useExactNumberBonds }, numberOfRows));
    }, [min, numberBond, numberOfRows, useAddition, useSubtraction, useExactNumberBonds]);

    const settings: Setting[] = [
        {
            initialValue: useExactNumberBonds,
            name: "Use exact Number Bonds",
            type: 'checkbox',
            onChange: setUseExactNumberBonds
        },
        {
            initialValue: maxNumberBond,
            name: "Maximum Number Bonds",
            type: 'number',
            onChange: setMaxNumberBond
        },
        {
            initialValue: numberOfRows,
            name: "number of rows",
            type: 'number',
            onChange: setNumberRows
        },
        {
            initialValue: useAddition,
            name: "addition",
            type: 'checkbox',
            onChange: setUseAddition
        },
        {
            initialValue: useSubtraction,
            name: "subtraction",
            type: 'checkbox',
            onChange: setUseSubtraction
        },
    ]
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
                                    onChange={setNumberBond}
                                />
                            </Grid>
                            <Accordion>
                                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <Typography>Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Settings values={settings}/>
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
