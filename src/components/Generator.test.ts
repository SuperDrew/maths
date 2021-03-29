import { generateRows, pickOperation, randBetween } from './Generator';
import * as fc from 'fast-check';
import { Operations } from './Operations';

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

describe('Generator', () => {
    it('should generate a random number <= min and <= max', () => {
        fc.assert(
            fc.property(fc.nat(100), fc.nat(100), (nat1, nat2) => {
                const min = nat1;
                const max = nat1 + nat2;
                expect(randBetween(min, max)).toBeLessThanOrEqual(max);
                expect(randBetween(min, max)).toBeGreaterThanOrEqual(min);
            })
        );
    });

    it('should generate 10 rows', () => {
        fc.assert(
            fc.property(fc.nat(100), fc.nat(100), (nat1, nat2) => {
                const expectedNumberOfRows = 10;
                const min = nat1;
                const numberBond = nat1 + nat2;
                const rows = generateRows(
                    { min, numberBond, useAddition: true, useSubtraction: false },
                    expectedNumberOfRows
                );
                expect(rows).toHaveLength(expectedNumberOfRows);
            })
        );
    });

    it('should pick a random operation from the selected operations', () => {
        const operations = [Operations.Addition, Operations.Subtraction];
        const operation = pickOperation(operations);
        expect(operation).toBeInArray(operations);
    });
});
