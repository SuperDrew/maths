import { generateRows, pickOperation, randBetween } from './Generator';
import * as fc from 'fast-check';
import { Operations } from './Operations';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInArray<T>(array: T[]): R;
            toBeWithinRange(floor: number, ceiling: number): R;
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
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
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

    it('should not generate any rows if no operations are provided', () => {
        fc.assert(
            fc.property(fc.nat(100), fc.nat(100), (nat1, nat2) => {
                const numRows = 10;
                const min = nat1;
                const numberBond = nat1 + nat2;
                const rows = generateRows({ min, numberBond, useAddition: false, useSubtraction: false }, numRows);
                expect(rows).toHaveLength(0);
            })
        );
    });

    describe('operations', () => {
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

        it('should generate roughly equal proportions of available operations', () => {
            fc.assert(
                fc.property(
                    fc.integer(0, 5),
                    fc.integer(0, 10),
                    fc.integer(500, 550),
                    (min, numberBond, numberOfRows) => {
                        const rows = generateRows(
                            { min, numberBond: min + numberBond, useAddition: true, useSubtraction: true },
                            numberOfRows
                        );
                        let additions = 0;
                        let subtractions = 0;
                        for (let row of rows) {
                            for (let sum of row.sums) {
                                if (sum.includes('+')) {
                                    additions++;
                                }
                                if (sum.includes('-')) {
                                    subtractions++;
                                }
                            }
                        }
                        const numberOfSums = numberOfRows * 3;
                        console.log(
                            `numberofSums: ${numberOfSums}, fiftypercent: ${numberOfSums / 2}, additions: ${
                                (additions * 100) / numberOfSums
                            }%, subtractions: ${(subtractions * 100) / numberOfSums}%`
                        );
                        const fiftyPercent = numberOfSums / 2;
                        const tenPercent = numberOfSums / 10;
                        const floor = fiftyPercent - tenPercent;
                        const ceiling = fiftyPercent + tenPercent;
                        expect(additions).toBeWithinRange(floor, ceiling);
                        expect(subtractions).toBeWithinRange(floor, ceiling);
                    }
                )
            );
        });
    });
});
