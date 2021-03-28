//TODO pull out numerical random generation into a different class to separate it from the string manipulation

const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomAdditionSum = (generateProps: GenerateProps) => {
    return `${randBetween(generateProps.min, generateProps.numberBond)} + ${randBetween(
        generateProps.min,
        generateProps.numberBond
    )} = ___`;
};

export interface Row {
    key: number;
    sums: string[];
}

const generateSums = (generateProps: GenerateProps) => [
    generateRandomAdditionSum(generateProps),
    generateRandomAdditionSum(generateProps),
    generateRandomAdditionSum(generateProps),
];

const generateRow = (generateProps: GenerateProps, rowNumber: number): Row => ({
    key: rowNumber,
    sums: generateSums(generateProps),
});

interface GenerateProps {
    min: number;
    numberBond: number;
    useAddition: boolean;
}

const generateRows = (generateProps: GenerateProps, expectedNumberOfRows: number): Row[] => {
    const rows = [];
    for (let i = 0; i < expectedNumberOfRows; i++) {
        rows.push(generateRow(generateProps, i));
    }
    return rows;
};

export type { GenerateProps };
export { generateRows, randBetween };
