import React from 'react';
import './reset.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Mathhssssss for everyone
                </p>
            </header>

            <div className='App-inputContainer'>
                <div>
                    <label htmlFor="min">Minimum: </label>
                    <select name="min" id="min">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="max">Maximum: </label>
                    <select name="max" id="max">
                        <option value="10">10</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="addition">Use addition: </label>
                    <input type="checkbox" id="addition" name="addition" value="addition"/>
                </div>

                <div>
                    <button type="button">Generate maths fun!</button>
                </div>

                <table id="table">
                    <tr>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default App;
