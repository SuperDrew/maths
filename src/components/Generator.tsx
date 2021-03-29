//TODO pull out numerical random generation into a different class to separate it from the string manipulation

import { Operations } from './Operations';

const pickOperation = (operations: Operations[]) => {
    return operations[Math.floor(Math.random() * operations.length)];
};

const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomSum = (generateProps: GenerateProps) => {
    // a +/- b = x
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
    return `${a} ${operation} ${b} = ___`;
};

export interface Row {
    key: number;
    sums: string[];
}

const generateSums = (generateProps: GenerateProps) => [
    generateRandomSum(generateProps),
    generateRandomSum(generateProps),
    generateRandomSum(generateProps),
];

const generateRow = (generateProps: GenerateProps, rowNumber: number): Row => ({
    key: rowNumber,
    sums: generateSums(generateProps),
});

interface GenerateProps {
    min: number;
    numberBond: number;
    useAddition: boolean;
    useSubtraction: boolean;
}

const generateRows = (generateProps: GenerateProps, expectedNumberOfRows: number): Row[] => {
    const rows = [];
    for (let i = 0; i < expectedNumberOfRows; i++) {
        rows.push(generateRow(generateProps, i));
    }
    return rows;
};

export type { GenerateProps };
export { generateRows, randBetween, pickOperation };
