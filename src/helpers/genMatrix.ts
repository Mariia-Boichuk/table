import { v4 as uuidv4 } from "uuid";

export const generateElement = () => {
  const cellValue = Math.floor(Math.random() * (999 - 100) + 100);

  return {
    id: uuidv4(),

    amount: cellValue,
  };
};

export const genMatrix = (m:number, n:number):[][] => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];
    result["rowId"] = uuidv4();
    for (let j = 0; j < n; j++) {
      result[i][j] = generateElement();
      if (j === 0) result[i][j].idForRow = uuidv4();
    }
  }

  return result;
};
