import { v4 as uuidv4 } from "uuid";

export const generateElement = () => {
  const cellValue = Math.floor(Math.random() * (999 - 100) + 100);
  return {
    id: uuidv4(),
    amount: cellValue,
  };
};

export const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = { id: uuidv4(), row: [] };
    for (let j = 0; j < n; j++) {
      result[i].row.push(generateElement());
    }
  }

  return result;
};

export const deleteRow = (matrix, rowIndex) => {
  return matrix.filter((item, index) => index !== rowIndex);
};

export const incrementOneCell = (matrix, rowIndex, columnIndex) => {
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
