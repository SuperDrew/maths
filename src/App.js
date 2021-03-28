import React, {useEffect, useState} from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import {Container, Divider, Grid, Icon, Typography} from "@material-ui/core";
import {LabelledSlider} from "./components/LabelledSlider";
import {LabelledCheckBox} from "./components/LabelledCheckBox";
import {QuestionTable} from "./components/QuestionTable";
import {useStyles} from "./styles/styles";

function App() {
    const classes = useStyles();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);
    const [rows, setRows] = useState([]);
    const updateMin = (changedMin) => {setMin(changedMin)};
    const updateMax = (changedMax) => {setMax(changedMax)};
    function randBetween(min, max) {

        return Math.round(Math.random()*(max-min)+min);
    }
    function generateRandomAdditionSum(min, max) {

        return `${randBetween(min, max)} + ${randBetween(min, max)} = ___`;
    }
    function createRow(min, max, rowNumber) {

        return {
            key: rowNumber,
            sum1: generateRandomAdditionSum(min,max),
            sum2: generateRandomAdditionSum(min,max),
            sum3: generateRandomAdditionSum(min,max)
        };
    }
    const generateRows = (min, max) => {

        const rows = [];
        for (let i = 0; i <= 10; i++) {
            rows.push(createRow(min, max, i))
        }
        setRows(rows);
    }
    useEffect(() => {generateRows(min, max)}, [min, max]);

    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h1" align="center">
                    Maths
                </Typography>
            </header>
            <Container maxWidth = "sm">
                <div>
                    <LabelledSlider label="minimum" max={10} defaultValue={min} step={1} onChange={updateMin}/>
                    <LabelledSlider label="maximum" max={10} defaultValue={max} step={1} onChange={updateMax}/>
                </div>
                <Grid container className={classes.root}>
                    <LabelledCheckBox name="addition" color="primary"/>
                    <LabelledCheckBox name="subtraction" color="primary"/>
                </Grid>
                <Divider variant="middle"/>
                <Grid container justify="center">
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={ () => {generateRows(min, max)}}>
                        Generate maths fun!
                    </Button>
                </Grid>
                <QuestionTable label="Questions" rows={rows}/>
            </Container>
        </div>
    );
}

export default App;
