import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import { MatrixContext } from "../context/MatrixContextProvider";
import { getClosestValues } from "../helpers/getClosestValues";

export const TableCell = react.memo(
  ({
    val,
    className,
    i,
    j,
    mainTableCell,
    symbol,
    setRowHovered,
    rowHovered,
  }) => {
    const { dispatch, matrix, rowsSum } = useContext(MatrixContext);
    const { closeValues, setCloseValues, x } = useContext(ClosevalsContext);
    return (
      <td
        className={`${className} ${
          closeValues.some((item) => item.id === symbol) && "hilight"
        } `}
        onClick={
          mainTableCell
            ? () => {
                dispatch({ type: "INCREMENT_CELL", payload: { i, j } });
              }
            : undefined
        }
        onMouseEnter={() => {
          if (mainTableCell)
            setCloseValues(getClosestValues(matrix, val, x, symbol));
          if (className === "aside") {
            setRowHovered(true);
          }
        }}
        onMouseLeave={() => {
          className === "aside" && setRowHovered(false);
          setCloseValues([]);
        }}
      >
        {rowHovered ? Math.round((val / rowsSum[i]) * 100) + "%" : val}
      </td>
    );
  }
);

TableCell.propTypes = {
  val: propTypes.number,
  className: propTypes.string,
  i: propTypes.number,
  j: propTypes.number,
  mainTableCell: propTypes.bool,
  symbol: propTypes.symbol,
  setRowHovered: propTypes.func,
};
