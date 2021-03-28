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

const createSums = (min: number, numberBond: number) => [
    generateRandomAdditionSum(min, numberBond),
    generateRandomAdditionSum(min, numberBond),
    generateRandomAdditionSum(min, numberBond),
];

const createRow = (min: number, numberBond: number, rowNumber: number): Row => ({
    key: rowNumber,
    sums: createSums(min, numberBond),
});

export const generateRows = (min: number, numberBond: number, _useAddition: boolean): Row[] => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
        rows.push(createRow(min, numberBond, i));
    }
    return rows;
};
