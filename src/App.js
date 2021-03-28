import React, { useEffect, useState } from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import { Container, Grid, Icon, Paper, Typography } from '@material-ui/core';
import { LabelledSlider } from './components/LabelledSlider';
import { LabelledCheckBox } from './components/LabelledCheckBox';
import { QuestionTable } from './components/QuestionTable';
import { makeStyles, withStyles } from '@material-ui/styles';

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
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);
    const [rows, setRows] = useState([]);
    const updateMin = (changedMin) => {
        setMin(changedMin);
    };

    const updateMax = (changedMax) => {
        setMax(changedMax);
    };

    const randBetween = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };

    const generateRandomAdditionSum = (min, max) => {
        return `${randBetween(min, max)} + ${randBetween(min, max)} = ___`;
    };

    const createRow = (min, max, rowNumber) => ({
        key: rowNumber,
        sum1: generateRandomAdditionSum(min, max),
        sum2: generateRandomAdditionSum(min, max),
        sum3: generateRandomAdditionSum(min, max),
    });

    const generateRows = (min, max) => {
        const rows = [];
        for (let i = 0; i <= 10; i++) {
            rows.push(createRow(min, max, i));
        }
        setRows(rows);
    };

    useEffect(() => {
        generateRows(min, max);
    }, [min, max]);

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
                                    label="minimum"
                                    max={10}
                                    defaultValue={min}
                                    step={1}
                                    onChange={updateMin}
                                />
                            </Grid>
                        </Paper>
                        <Paper className={classes.control}>
                            <Grid item>
                                <LabelledSlider
                                    label="maximum"
                                    max={10}
                                    defaultValue={max}
                                    step={1}
                                    onChange={updateMax}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid item>
                            <Paper className={classes.control}>
                                <LabelledCheckBox name="addition" color="primary" />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.control}>
                                <LabelledCheckBox name="subtraction" color="primary" />
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
                                    generateRows(min, max);
                                }}
                            >
                                Generate maths fun!
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <QuestionTable label="Questions" rows={rows} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
