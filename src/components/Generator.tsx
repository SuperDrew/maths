const randBetween = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomAdditionSum = (min: number, max: number) => {
    return `${randBetween(min, max)} + ${randBetween(min, max)} = ___`;
};

export interface Row {
    key: number;
    sum1: string;
    sum2: string;
    sum3: string;
}

const createRow = (min: number, numberBond: number, rowNumber: number): Row => ({
    key: rowNumber,
    sum1: generateRandomAdditionSum(min, numberBond),
    sum2: generateRandomAdditionSum(min, numberBond),
    sum3: generateRandomAdditionSum(min, numberBond),
});

export const generateRows = (min: number, numberBond: number, _useAddition: boolean): Row[] => {
    const rows = [];
    for (let i = 0; i <= 10; i++) {
        rows.push(createRow(min, numberBond, i));
    }
    return rows;
};
