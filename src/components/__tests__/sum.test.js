import { sum } from "../sum";

test("Sum function to cal the sum of 2 nos.", () => {

    const result = sum(5,7);

    // Assertion
    expect(result).toBe(12);
});