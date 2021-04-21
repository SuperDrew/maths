import { Operations } from '../operations/Operations';
import { GenerateProps } from './Generator';
import { NotImplementedError } from '../customErrors/CustomErrors';

type Answer = '___';
type NumberOrAnswer = number | Answer;

interface Operands {
    a: NumberOrAnswer;
    operation: Operations;
    b: NumberOrAnswer;
    x: NumberOrAnswer;
}

const pickRandomElementInArray = <T>(array: Array<T>): T => {
    return array[Math.floor(Math.random() * array.length)];
}

const pickOperation = (operations: Operations[]) => {
    return pickRandomElementInArray(operations);
};

const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

function createOperations(generateProps: GenerateProps) {
    const operations = [];
    if (generateProps.useAddition) {
        operations.push(Operations.Addition);
    }
    if (generateProps.useSubtraction) {
        operations.push(Operations.Subtraction);
    }
    return operations;
}

const generateAOperandAnswerEqualsX = (generateProps: GenerateProps): Operands => {
    const operation = pickOperation(createOperations(generateProps));
    let a: NumberOrAnswer;
    let x: NumberOrAnswer;
    if (generateProps.useExactNumberBonds) {
        // TODO this is dumb, for exactNumberBonds and subtraction it will always generate <numberBond> - 0 = <numberbond>
        a = operation === Operations.Addition ? randBetween(generateProps.min, generateProps.numberBond) : generateProps.numberBond;
        x = generateProps.numberBond
    }
    else {
        a = randBetween(generateProps.min, generateProps.numberBond);
        x = operation === Operations.Addition ? randBetween(a, generateProps.numberBond) : randBetween(0, a);
    }
    return { a, operation, b: '___', x };
};

const generateAOperandBEqualsAnswer = (generateProps: GenerateProps): Operands => {
    const operation = pickOperation(createOperations(generateProps));
    let a: NumberOrAnswer;
    let b: NumberOrAnswer;
    if (generateProps.useExactNumberBonds) {
        if (operation === Operations.Subtraction) {
            a = generateProps.numberBond;
            b = randBetween(generateProps.min, generateProps.numberBond);
        }
        else if (operation === Operations.Addition) {
            a = randBetween(generateProps.min, generateProps.numberBond);
            b = generateProps.numberBond - a;
        }
        else {
            throw new NotImplementedError(operation);
        }
    }
    else {
        a = randBetween(generateProps.min, generateProps.numberBond);
        b =
            operation === Operations.Addition
                ? randBetween(generateProps.min, generateProps.numberBond - a)
                : randBetween(0, a);
    }
    return { a, operation, b, x: '___' };
};

export type { Operands };
export { generateAOperandBEqualsAnswer, generateAOperandAnswerEqualsX, randBetween, pickRandomElementInArray, pickOperation };
