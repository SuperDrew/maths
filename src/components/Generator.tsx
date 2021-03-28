export const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomAdditionSum = (min: number, max: number) => {
    return `${randBetween(min, max)} + ${randBetween(min, max)} = ___`;
};

export interface Row {
    key: number;
    sums: string[];
}

const generateSums = (min: number, numberBond: number) => [
    generateRandomAdditionSum(min, numberBond),
    generateRandomAdditionSum(min, numberBond),
    generateRandomAdditionSum(min, numberBond),
];

const generateRow = (min: number, numberBond: number, rowNumber: number): Row => ({
    key: rowNumber,
    sums: generateSums(min, numberBond),
});

export const generateRows = (
    min: number,
    numberBond: number,
    expectedNumberOfRows: number,
    _useAddition: boolean
): Row[] => {
    const rows = [];
    for (let i = 0; i < expectedNumberOfRows; i++) {
        rows.push(generateRow(min, numberBond, i));
    }
    return rows;
};
