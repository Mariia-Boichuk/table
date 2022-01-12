export const getClosestValues = (matrix, targetCell, x = 4, symbol) => {
  const vals = matrix
    .flat()
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetCell) - Math.abs(b.amount - targetCell)
    )
    .filter((item, index) => {
      return item.id !== +symbol && index <= +x;
    });

  return vals;
};
