import React from "react";

export const Input = (inputProps) => {
    return (
        <div className='App-inputContainer'>
            <label className='App-label'>
                {inputProps.label}
            </label>
            <input onChange={inputProps.onChange} name={inputProps.name} className='App-input' type={inputProps.type} ref={inputProps.registerValidation}/>
            <span className={`App-errorMessage ${(inputProps.errors[inputProps.name] ? "App-errorMessageVisible" : '')}`}>
                {inputProps.errorMesssage}
            </span>
        </div>
)}