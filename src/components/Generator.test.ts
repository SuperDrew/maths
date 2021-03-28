import { randBetween } from './Generator';

describe('Generator', () => {
    it('should generate a random number <= min and <= max', () => {
        const min = 0;
        const max = 1;
        const rand = randBetween(min, max);
        expect(rand).toBeGreaterThanOrEqual(min);
        expect(rand).toBeLessThanOrEqual(max);
    });
});
