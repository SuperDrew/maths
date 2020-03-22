import React from 'react';
import { Form }  from './Form';
import './App.css';
import './reset.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Generatore di frasi del Mantu
                </p>
            </header>

            <div className='App-inputContainer'>
                <Form/>
            </div>
        </div>
    );
}

export default App;
