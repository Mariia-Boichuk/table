export const getClosestValues = (matrix, targetCell, x = 20000, id) => {
  const vals = matrix
    .flat()
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetCell) - Math.abs(b.amount - targetCell)
    )
    .filter((item, index) => {
      //  console.log(id, item.id);
      return item.id !== id && index <= +x;
    });

  return vals;
};
