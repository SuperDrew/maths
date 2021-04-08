import { generateRows } from '../../../src/core/generator/Generator';
import * as fc from 'fast-check';
import { debug } from '../../../src/config';

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(floor: number, ceiling: number): R;
        }
    }
}

expect.extend({
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
    it.each([
        [true, false],
        [false, true],
        [true, true],
    ])(
        'should generate 10 rows with a high enough Number Bond with useAddition: %s, useSubtraction: %s',
        (useAddition, useSubtraction) => {
            fc.assert(
                fc.property(fc.constant(0), fc.constant(10), fc.integer(20, 30), (min, numberOfRows, numberBond) => {
                    const rows = generateRows(
                        {
                            min,
                            numberBond,
                            useExactNumberBonds: false,
                            useAddition: useAddition,
                            useSubtraction: useSubtraction,
                        },
                        numberOfRows
                    );
                    expect(rows).toHaveLength(numberOfRows);
                })
            );
        }
    );

    it('should not generate any rows if no operations are provided', () => {
        fc.assert(
            fc.property(fc.nat(100), fc.nat(100), (nat1, nat2) => {
                const numRows = 10;
                const min = nat1;
                const numberBond = nat1 + nat2;
                const rows = generateRows(
                    { min, numberBond, useExactNumberBonds: false, useAddition: false, useSubtraction: false },
                    numRows
                );
                expect(rows).toHaveLength(0);
            })
        );
    });

    it('should generate unique sums', () => {
        fc.assert(
            fc.property(fc.constant(0), fc.nat(100), fc.nat(20), (min, numberBond, numRows) => {
                const rows = generateRows(
                    { min, numberBond, useExactNumberBonds: false, useAddition: true, useSubtraction: true },
                    numRows
                );

                let allSums: string[] = [];
                for (let row of rows) {
                    for (let sum of row.sums) {
                        allSums.push(sum);
                    }
                }
                debug(`allSums: ${allSums}`);
                expect(allSums.length).toBe([...new Set(allSums)].length);
            })
        );
    });

    describe('operations', () => {
        it('should generate roughly equal proportions of available operations', () => {
            fc.assert(
                fc.property(
                    fc.constant(0),
                    fc.integer(1, 10),
                    fc.integer(500, 550),
                    (min, numberBond, numberOfRows) => {
                        const rows = generateRows(
                            {
                                min,
                                useExactNumberBonds: false,
                                numberBond: min + numberBond,
                                useAddition: true,
                                useSubtraction: true,
                            },
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
                        const numberOfSums = additions + subtractions;
                        debug(
                            `numberOfSums: ${numberOfSums}, fiftyPercent: ${numberOfSums / 2}, additions: ${
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
