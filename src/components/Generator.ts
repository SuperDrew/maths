//TODO pull out numerical random generation into a different class to separate it from the string manipulation

import { Operations } from './Operations';
import { generateAPlusOrMinusBEqualsX } from './OperandsGenerator';

const pickOperation = (operations: Operations[]) => {
    return operations[Math.floor(Math.random() * operations.length)];
};

const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomSum = (generateProps: GenerateProps) => {
    const { a, operation, b, x } = generateAPlusOrMinusBEqualsX(generateProps);
    return `${a} ${operation} ${b} = ${x}`;
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

const generateRows = (generateProps: GenerateProps, numberOfRows: number): Row[] => {
    if (!generateProps.useSubtraction && !generateProps.useAddition) {
        return [];
    }
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
        rows.push(generateRow(generateProps, i));
    }
    return rows;
};

export type { GenerateProps };
export { generateRows, randBetween, pickOperation };
