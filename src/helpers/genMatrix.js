export const genereteElement = () => {
  const cellValue = Math.floor(Math.random() * (999 - 100) + 100);

  return {
    id: Symbol(),
    amount: cellValue,
  };
};

export const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];

    for (let j = 0; j < n; j++) {
      result[i][j] = genereteElement();
    }
  }

  return result;
};
