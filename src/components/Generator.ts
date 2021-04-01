import { generateAOperandBEqualsAnswer, Operands } from './OperandsGenerator';

const numberOfColumns = 3;
const generationFactorForUniqueness = 4;

interface Row {
    key: number;
    sums: string[];
}

interface GenerateProps {
    min: number;
    numberBond: number;
    useAddition: boolean;
    useSubtraction: boolean;
    useExactNumberBonds: boolean;
}

const transformOperandsIntoSum = (operands: Operands) =>
    `${operands.a} ${operands.operation} ${operands.b} = ${operands.x}`;

const generateRows = (generateProps: GenerateProps, numberOfRows: number): Row[] => {
    if (!generateProps.useSubtraction && !generateProps.useAddition) {
        return [];
    }

    const numSumsForWholeGrid = numberOfRows * numberOfColumns;
    let operandsArray: Operands[] = [];
    for (let j = 0; j < numSumsForWholeGrid * generationFactorForUniqueness; j++) {
        operandsArray.push(generateAOperandBEqualsAnswer(generateProps));
    }
    const sumsArray: string[] = operandsArray.map<string>((operand) => {
        return transformOperandsIntoSum(operand);
    });

    const uniqueSumsArray: string[] = [...new Set<string>(sumsArray)];
    const rows = [];
    let uniqueSumPosition = 0;
    for (let i = 0; i < numberOfRows; i++) {
        if (uniqueSumPosition > uniqueSumsArray.length) {
            break;
        }
        rows.push({ key: i, sums: uniqueSumsArray.slice(uniqueSumPosition, uniqueSumPosition + numberOfColumns) });
        uniqueSumPosition += numberOfColumns;
    }

    return rows;
};

export type { GenerateProps, Row };
export { generateRows };
