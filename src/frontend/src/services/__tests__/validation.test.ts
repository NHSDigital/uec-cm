import { isPostcodeValid } from "../validation";

describe('post code validation', () => {
  const tests = [
    { description: 'no post code', input: '', expected: false },
    { description: 'post code too long', input: 'NG11 1AAA', expected: false },
    { description: 'postcode - AAN NAA', input: 'EX1 2EA', expected: true },
    { description: 'postcode - AANA NAA', input: 'EC1A 1AA', expected: true },
    { description: 'postcode - AANN NAA', input: 'EX39 4AT', expected: true },
    { description: 'postcode - AN NAA', input: 'M4 6ED', expected: true },
    { description: 'postcode - ANA NAA', input: 'W1A 1AA', expected: true },
    { description: 'postcode - ANN NAA', input: 'M18 8DF', expected: true },
    { description: 'postcode - CF62 3BG', input: 'CF62 3BG', expected: true },
    { description: 'postcode - LL67 0HD', input: 'LL67 0HD', expected: true },
    { description: 'postcode - Lower Case', input: 'm4 6ed', expected: true },
    { description: 'postcode - Lower Case', input: 'nr17 1qw', expected: true },
    { description: 'postcode - Multiple Gaps', input: 'M4  6ED', expected: true },
    { description: 'postcode - No Gap', input: 'M46ED', expected: true },
    { description: 'postcode - ZE3 9JP', input: 'ZE3 9JP',expected: true}
  ];

  tests.forEach(test => {
    it(test.description, () => {
      const isValid = isPostcodeValid(test.input);
      expect(isValid).toBe(test.expected);
    });
  });
});
