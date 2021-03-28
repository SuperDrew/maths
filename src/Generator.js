const randBetween = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const generateRandomAdditionSum = (min, max) => {
    return `${randBetween(min, max)} + ${randBetween(min, max)} = ___`;
};

const createRow = (min, max, rowNumber) => ({
    key: rowNumber,
    sum1: generateRandomAdditionSum(min, max),
    sum2: generateRandomAdditionSum(min, max),
    sum3: generateRandomAdditionSum(min, max),
});

export const generateRows = (min, max, useAddition) => {
    const rows = [];
    for (let i = 0; i <= 10; i++) {
        rows.push(createRow(min, max, i));
    }
    return rows;
};
