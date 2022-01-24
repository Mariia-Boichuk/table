export const getClosestValues = ({
  matrix,
  targetCell,
  numberOfValues,
  id,
}) => {
  return matrix
    .reduce((newArray, item) => newArray.concat(item.row), [])
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetCell) - Math.abs(b.amount - targetCell)
    )
    .filter((item, index) => item.id !== id && index <= numberOfValues);
};
