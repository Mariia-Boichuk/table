export const getClosestValues = (matrix, targetCell, x) => {
  x = 4;
  console.log(matrix);
  return matrix
    .map((item) => {
      item.diff = Math.abs(item.amount - targetCell);
      return item;
    })
    .sort((a, b) => a.diff - b.diff)
    .slice(0, x)
    .map((el) => el.amount);
};
