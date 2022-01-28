import { ITableItem, Matrix } from "../helpers/interfaces";

interface IArgs {
  matrix:Matrix,
  targetCell:number,
  numberOfValues:number,
  id:string,
}

export const getClosestValues = ({
  matrix,
  targetCell,
  numberOfValues,
  id,
}:IArgs):ITableItem[] => {

  return matrix
    .reduce((newArray:ITableItem[], item) => newArray.concat(item.row), [])
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetCell) - Math.abs(b.amount - targetCell)
    )
    .filter((item, index) => item.id !== id && index <= numberOfValues);
};
