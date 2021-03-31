import { generateAPlusOrMinusBEqualsX, Operands } from './OperandsGenerator';

const numberOfColumns = 3;
const generationFactorForUniqueness = 2;

interface Row {
    key: number;
    sums: string[];
}

interface GenerateProps {
    min: number;
    numberBond: number;
    useAddition: boolean;
    useSubtraction: boolean;
    useExactNumberBonds?: boolean;
}

const transformOperandsIntoSum = (operands: Operands) =>
    `${operands.a} ${operands.operation} ${operands.b} = ${operands.x}`;

const getSums = (uniqueOperandArray: Operands[], uniqueSumPosition: number) => {
    const slice = uniqueOperandArray.slice(uniqueSumPosition, uniqueSumPosition + numberOfColumns);
    return slice.map((operands) => transformOperandsIntoSum(operands));
};

const generateRows = (generateProps: GenerateProps, numberOfRows: number): Row[] => {
    if (!generateProps.useSubtraction && !generateProps.useAddition) {
        return [];
    }

    const numSumsForWholeGrid = numberOfRows * numberOfColumns;
    let operandsArray = [];
    for (let j = 0; j < numSumsForWholeGrid * generationFactorForUniqueness; j++) {
        operandsArray.push(generateAPlusOrMinusBEqualsX(generateProps));
    }

    // TODO This set does not produce uniqueness as it's on an object and it doesn't do deep equality.
    const uniqueOperandsArray = [...new Set(operandsArray)];
    const rows = [];
    let uniqueSumPosition = 0;
    for (let i = 0; i < numberOfRows; i++) {
        rows.push({ key: i, sums: getSums(uniqueOperandsArray, uniqueSumPosition) });
        uniqueSumPosition += numberOfColumns;
    }

    return rows;
};

export type { GenerateProps, Row };
export { generateRows };
