import { Operations } from './Operations';
import { GenerateProps } from './Generator';
import { NotImplementedError } from '../CustomErrors/CustomeErrors';

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

const generateAPlusOrMinusBEqualsX = (generateProps: GenerateProps): Operands => {
    if (generateProps.useExactNumberBonds) {
        const operation = pickOperation(createOperations(generateProps));
        if (operation === Operations.Subtraction) {
            const a = generateProps.numberBond;
            const b = randBetween(generateProps.min, generateProps.numberBond);
            return { a, operation, b, x: '___' };
        }
        if (operation === Operations.Addition) {
            const a = randBetween(generateProps.min, generateProps.numberBond);
            const b = generateProps.numberBond - a;
            return { a, operation, b, x: '___' };
        }
        throw new NotImplementedError(operation);
    }
    const a = randBetween(generateProps.min, generateProps.numberBond);
    const operation = pickOperation(createOperations(generateProps));
    const b =
        operation === Operations.Addition
            ? randBetween(generateProps.min, generateProps.numberBond - a)
            : randBetween(0, a);
    return { a, operation, b, x: '___' };
};

export type { Operands };
export { generateAPlusOrMinusBEqualsX, randBetween, pickOperation };
