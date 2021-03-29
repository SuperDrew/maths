import { Operations } from './Operations';
import { GenerateProps, pickOperation, randBetween } from './Generator';

type Answer = '___';
type numberOrAnswer = number | Answer;

interface Operands {
    a: numberOrAnswer;
    operation: Operations;
    b: numberOrAnswer;
    x: numberOrAnswer;
}

const generateAPlusOrMinusBEqualsX = (generateProps: GenerateProps) => {
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
    return <Operands>{ a, operation, b, x: '___' };
};

export { generateAPlusOrMinusBEqualsX };
