export const getClosestValues = (matrix, targetCell, x = 4, symbol) => {
  return [...matrix]
    .flat()
    .filter((item) => item.id !== symbol)
    .map((item) => {
      item.diff = Math.abs(item.amount - targetCell);
      return item;
    })
    .sort((a, b) => a.diff - b.diff)
    .slice(0, x)
    .map((el) => el.id);
};
