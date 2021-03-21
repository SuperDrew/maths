import React from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import {Container, Divider, Grid, Icon, Table, Typography} from "@material-ui/core";
import {LabelledSlider} from "./components/LabelledSlider";
import {LabelledCheckBox} from "./components/LabelledCheckBox";
import {QuestionGrid} from "./components/QuestionGrid";
import {useStyles} from "./styles/styles";

function App() {
    const classes = useStyles();

    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h1" align="center">
                    Maths
                </Typography>
            </header>
            <Container maxWidth = "sm">
                <div>
                    <LabelledSlider label="minimum" max={10} defaultValue={0} step={1}/>
                    <LabelledSlider label="maximum" max={10} defaultValue={0} step={1}/>
                </div>
                <Grid container className={classes.root}>
                    <LabelledCheckBox name="addition" color="primary"/>
                    <LabelledCheckBox name="subtraction" color="primary"/>
                </Grid>
                <Divider variant="middle"/>
                <Grid container justify="center">
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
                        Generate maths fun!
                    </Button>
                </Grid>
                <QuestionGrid label="Questions"/>
            </Container>
        </div>
    );
}

export default App;
