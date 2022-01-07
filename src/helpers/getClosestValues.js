export const getClosestValues = (matrix, targetCell, x = 4, symbol) => {
  return matrix
    .flat()
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetCell) - Math.abs(b.amount - targetCell)
    )
    .filter((item, index) => item.id !== symbol && index < Number(x));
};
