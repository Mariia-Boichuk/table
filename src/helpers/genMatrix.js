export const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];

    for (let j = 0; j < n; j++) {
      const cellValue = Math.floor(Math.random() * (999 - 100) + 100);

      result[i][j] = {
        id: Symbol(),
        amount: cellValue,
      };
    }
  }

  return result;
};
