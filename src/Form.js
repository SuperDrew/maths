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
    const { register, errors, triggerValidation, getValues} = useForm();
    const [colours, setColours] = useState([]);
    const [people, setPeople] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [responses, setResponses] = useState({
        animals: {},
        people: {},
        numbers: {},
        colours: {}
    });
    const [phrase, setPhrase] = useState({
        numbers: '',
        colours: '',
        people: '',
        animals: ''
    });

    const validateColour = (colour) => {
        return isElementInTheList(colour, colours);
    };

    const validatePeople = (person) => {
        return isElementInTheList(person, people);
    };

    const validateAnimals = (animal) => {
        return isElementInTheList(animal, animals);
    };

    const onValueChanged = async(key, responsesKey) => {
        await triggerValidation();
        const values = getValues();
        const value = (values[key]).trim().toLowerCase();
        const partOfPhrase = (responses[responsesKey][value] || "");

        setPhrase({
            ...phrase,
            [responsesKey]: partOfPhrase
        });
    };

    const numberChanged = async () => {
        await onValueChanged('number', 'numbers')
    };

    const colourChanged = async () => {
        await onValueChanged('colour', 'colours')
    };

    const peopleChanged = async () => {
        await onValueChanged('person', 'people')
    };

    const animalChanged = async () => {
        await onValueChanged('animal', 'animals')
    };

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data.json`).then((response) => {
            response.json().then((data) => {
                setColours(data.colours);
                setPeople(data.people);
                setAnimals(data.animals);
            })
        });

        fetch(`${process.env.PUBLIC_URL}/responses.json`).then((response) => {
            response.json().then((data) => {
                setResponses(data);
            })
        });
    }, []);

    return (
        <>
            <form>
                <Input
                    type='text'
                    label='Scegli un colore'
                    onChange={colourChanged}
                    name='colour'
                    registerValidation={register({ validate: validateColour })}
                    errors={errors}
                    errorMesssage='Il Mantu non conosce questo colore'>
                </Input>

                <Input
                    type='number'
                    label='Scegli un numero'
                    onChange={numberChanged}
                    name='number'
                    registerValidation={register({ min: 1, max: 99 })}
                    errors={errors}
                    errorMesssage='Il Mantu sa contare da 1 a 99'>
                </Input>

                <Input
                    type='text'
                    label='Scegli un nome di persona'
                    onChange={peopleChanged}
                    name='person'
                    registerValidation={register({ validate: validatePeople })}
                    errors={errors}
                    errorMesssage='E questo chi é?'>
                </Input>

                <Input
                    type='text'
                    label='Scegli un nome di animale'
                    onChange={animalChanged}
                    name='animal'
                    registerValidation={register({ validate: validateAnimals })}
                    errors={errors}
                    errorMesssage='Il Mantu non conosce questo animale'>
                </Input>
            </form>
            <span className='App-phrase'>{phrase.colours} {phrase.numbers} {phrase.people} {phrase.animals}</span>
        </>
    );
};