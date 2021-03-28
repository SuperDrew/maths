import { randBetween } from './Generator';
import * as fc from 'fast-check';

describe('Generator', () => {
    it('should generate a random number <= min and <= max', () => {
        fc.assert(
            fc.property(fc.nat(), fc.nat(), (nat1, nat2) => {
                const min = nat1;
                const max = nat1 + nat2;
                expect(randBetween(min, max)).toBeLessThanOrEqual(max);
                expect(randBetween(min, max)).toBeGreaterThanOrEqual(min);
            })
        );
    });
});
