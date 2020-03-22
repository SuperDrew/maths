import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {Input} from "./Input";



const isElementInTheList = (element, list) => {
    if(!element) {
        return true
    }

    return list.includes(element.trim().toLowerCase());
};

export const Form = () => {
    const { register, errors, triggerValidation} = useForm();
    const [colours, setColours] = useState([]);
    const [people, setPeople] = useState([]);

    const validateColour = (colour) => {
        return isElementInTheList(colour, colours);
    };

    const validatePeople = (person) => {
        return isElementInTheList(person, people);
    };

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data.json`).then((response) => {
            response.json().then((data) => {
                setColours(data.colours);
                setPeople(data.people);
            })
        })
    }, []);

    const validation = async () => {
        await triggerValidation();
    };

    return (
        <form>
            <Input
                type='number'
                label='Scegli un numero'
                onChange={validation}
                name='numbers'
                registerValidation={register({ min: 1, max: 99 })}
                errors={errors}
                errorMesssage='Il Mantu sa contare da 1 a 99'>
            </Input>

            <Input
                type='text'
                label='Scegli un colore'
                onChange={validation}
                name='colours'
                registerValidation={register({ validate: validateColour })}
                errors={errors}
                errorMesssage='Il Mantu non conosce questo colore'>
            </Input>

            <Input
                type='text'
                label='Scegli un nome di persona'
                onChange={validation}
                name='person'
                registerValidation={register({ validate: validatePeople })}
                errors={errors}
                errorMesssage='E questo chi é?'>
            </Input>
        </form>
    );
};