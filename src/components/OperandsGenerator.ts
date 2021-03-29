import { Operations } from './Operations';
import { GenerateProps } from './Generator';

type Answer = '___';
type numberOrAnswer = number | Answer;

interface Operands {
    a: numberOrAnswer;
    operation: Operations;
    b: numberOrAnswer;
    x: numberOrAnswer;
}

const pickOperation = (operations: Operations[]) => {
    return operations[Math.floor(Math.random() * operations.length)];
};

const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateAPlusOrMinusBEqualsX = (generateProps: GenerateProps): Operands => {
    const a = randBetween(generateProps.min, generateProps.numberBond);
    const operations = [];
    if (generateProps.useAddition) {
        operations.push(Operations.Addition);
    }
    if (generateProps.useSubtraction) {
        operations.push(Operations.Subtraction);
    }
    const operation = pickOperation(operations);
    const b =
        operation === Operations.Addition
            ? randBetween(generateProps.min, generateProps.numberBond - a)
            : randBetween(0, a);
    return { a, operation, b, x: '___' };
};

export type { Operands };
export { generateAPlusOrMinusBEqualsX, randBetween, pickOperation };
