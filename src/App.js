import React from 'react';
import './reset.css';
import Button from '@material-ui/core/Button';
import {Checkbox, Container, FormControlLabel, Typography} from "@material-ui/core";
import {LabelledSlider} from "./LabelledSlider";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h1" align={"center"}>
                    Maths
                </Typography>
            </header>
            <Container maxWidth = "sm">
                <div>
                    <LabelledSlider label="Minimum" max={10} defaultValue={0} step={1}/>
                    <LabelledSlider label="Maximum" max={10} defaultValue={0} step={1}/>
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="addition"
                    labelPlacement="start"
                />
                <div>
                    <Button variant="contained" color="primary">
                        Generate maths fun!
                    </Button>
                </div>

                <table id="table">
                    <tr>
                    </tr>
                </table>
            </Container>
        </div>
    );
}

export default App;
