import React, { useContext } from "react";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import { MatrixContext } from "../context/MatrixContextProvider";
import { getClosestValues } from "../helpers/getClosestValues";

export const TableCell = ({
  val,
  className,
  i,
  j,
  mainTableCell,
  symbol,
  setrowHovered,
}) => {
  const { dispatch, matrix } = useContext(MatrixContext);
  const { closeValues, setCloseValues, x } = useContext(ClosevalsContext);
  return (
    <td
      className={closeValues.includes(symbol) ? "hilight" : className}
      onClick={
        mainTableCell
          ? () => {
              dispatch({ type: "INCRECELL", payload: { i, j } });
            }
          : undefined
      }
      onMouseEnter={() => {
        if (mainTableCell)
          setCloseValues(getClosestValues(matrix, val, x, symbol));
        if (className === "aside") {
          setrowHovered(true);
        }
      }}
      onMouseLeave={
        className === "aside" ? () => setrowHovered(false) : undefined
      }
    >
      {val}
    </td>
  );
};
