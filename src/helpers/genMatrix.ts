import { v4 as uuidv4 } from "uuid";
import { ITableItem, Matrix, MatrixRow } from "./interfaces";

export const generateElement = (): ITableItem => {
  const cellValue = Math.floor(Math.random() * (999 - 100) + 100);
  return {
    id: uuidv4(),
    amount: cellValue,
  };
};

export const genMatrix = (
  rowsQuantity: number,
  columnsQuantity: number
): Matrix => {
  const result: MatrixRow[] = [];

  for (let i = 0; i < rowsQuantity; i++) {
    result[i] = { id: uuidv4(), row: [] };
    for (let j = 0; j < columnsQuantity; j++) {
      result[i].row.push(generateElement());
    }
  }

  return result;
};

export const deleteRow = (matrix: Matrix, rowIndex: number): Matrix =>
  matrix.filter((item, index) => index !== rowIndex);

export const incrementOneCell = (
  matrix: Matrix,
  rowIndex: number,
  columnIndex: number
): Matrix => {
  return matrix.map((item, index) => {
    const row = item.row.map((itemCell, jCell) => {
      if (index === rowIndex && jCell === columnIndex) {
        return { ...itemCell, amount: itemCell.amount + 1 };
      }
      return itemCell;
    });
    return { ...item, row };
  });
};
