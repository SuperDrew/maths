import React from 'react';
import './App.css';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Generatore di frasi del Mantu
                </p>
            </header>

            <div>
                <div><label className='App-label'>Scegli un numero</label></div>
                <input className='App-input' type='number'/>
            </div>
        </div>
    );
}

export default App;
