import "@testing-library/jest-dom/extend-expect";
import {
  generateElement,
  genMatrix,
  deleteRow,
  incrementOneCell,
} from "../helpers/genMatrix";
import { mockMatrix } from "../__data__/mockMatrix";
import { getClosestValues } from "../helpers/getClosestValues";

describe("testing helpers matrix", () => {
  it("should generate amount >99, <1000", () => {
    const elem = generateElement();
    expect(elem.amount).toBeGreaterThan(99);
    expect(elem.amount).toBeLessThan(1000);
  });

  it("should generate matrix with proper amount of rows", () => {
    const matrix = genMatrix(5, 12);
    expect(matrix.length).toBe(5);
  });

  it("should generate matrix with proper amount of columns", () => {
    const matrix = genMatrix(5, 12);
    expect(matrix[0].row.length).toBe(12);
  });

  it("should delete row", () => {
    const matrix = deleteRow(mockMatrix, 3);
    expect(matrix.length).toBe(8);
  });

  it("should increment cell", () => {
    const matrix = incrementOneCell(mockMatrix, 1, 3);
    expect(matrix[1].row[3].amount).toBe(990);
  });
});

it("should return array of proper close values", () => {
  const values = getClosestValues({
    matrix: mockMatrix,
    targetCell: 710,
    numberOfValues: 3,
    id: "c528b96f-15db-4798-b4b0-54c549d6ab0f",
  });
  expect(values).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ amount: 668 }),
      expect.objectContaining({ amount: 716 }),
      expect.objectContaining({ amount: 699 }),
    ])
  );
});

it("should return array with length of 5 when number of values is 5", () => {
  const values = getClosestValues({
    matrix: mockMatrix,
    targetCell: 710,
    numberOfValues: 5,
    id: "c528b96f-15db-4798-b4b0-54c549d6ab0f",
  });
  expect(values.length).toBe(5);
});
