import {
    generateAOperandBEqualsAnswer,
    Operands,
    pickOperation,
    randBetween,
} from './OperandsGenerator';
import { Operations } from './Operations';
import * as fc from 'fast-check';
import { NotImplementedError } from '../customErrors/CustomeErrors';
import { debug } from '../config';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInArray<T>(array: T[]): R;
        }
    }
}

expect.extend({
    toBeInArray<T>(received: T, array: T[]) {
        const receivedIsInArray = array.includes(received);
        if (receivedIsInArray) {
            return {
                message: () => `expected ${received} not to be in array [${array}]`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be in array [${array}]`,
                pass: false,
            };
        }
    },
});

const evaluateOperandsForExactNumberBond = (operands: Operands, numberBond: number) => {
    if (operands.operation === Operations.Addition) {
        const aAsNumber = operands.a as number;
        const bAsNumber = operands.b as number;
        return aAsNumber + bAsNumber === numberBond;
    }
    if (operands.operation === Operations.Subtraction) {
        const aAsNumber = operands.a as number;
        const bAsNumber = operands.b as number;
        return aAsNumber === numberBond && bAsNumber <= numberBond && bAsNumber >= 0;
    }
    throw new NotImplementedError(operands.operation);
};

describe('OperandsGenerator', () => {
    it('should generate a random number >= min and <= max', () => {
        fc.assert(
            fc.property(fc.nat(100), fc.nat(100), (nat1, nat2) => {
                const min = nat1;
                const max = nat1 + nat2;
                expect(randBetween(min, max)).toBeLessThanOrEqual(max);
                expect(randBetween(min, max)).toBeGreaterThanOrEqual(min);
            })
        );
    });

    it('should pick a random operation from the selected operations', () => {
        fc.assert(
            fc.property(
                fc.set(fc.constantFrom(Operations.Addition, Operations.Subtraction), {
                    minLength: 1,
                    maxLength: 2,
                }),
                (operations) => {
                    const operation = pickOperation(operations);
                    expect(operation).toBeInArray(operations);
                }
            )
        );
    });

    describe('should generate sums with Answer in b position', () => {
        it('shoudl generate valid sums', () => {});
    });

    describe('when exact number bonds are used', () => {
        it('should generate sums that are equal to the number bond selected', () => {
            fc.assert(
                fc.property(fc.integer(0, 10), (numberBond) => {
                    const operands = generateAOperandBEqualsAnswer({
                        min: 0,
                        numberBond: numberBond,
                        useAddition: true,
                        useSubtraction: true,
                        useExactNumberBonds: true,
                    });
                    debug(
                        `operands: a: ${operands.a}, operation: ${operands.operation}, b: ${operands.b}, numberBond: ${numberBond}`
                    );
                    expect(evaluateOperandsForExactNumberBond(operands, numberBond)).toBe(true);
                })
            );
        });
    });
});
