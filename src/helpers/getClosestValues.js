export const getClosestValues = (matrix, targetCell, x) => {
  x = 4;
  targetCell = 500;
  const result = [...matrix];

  return result
    .flat()
    .map((item) => {
      item.amount = Math.abs(item.amount - targetCell);
      return item;
    })
    .sort((a, b) => a.amount - b.amount)
    .slice(0, x);
};
