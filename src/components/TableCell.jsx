import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import { MatrixContext } from "../context/MatrixContextProvider";
import { getClosestValues } from "../helpers/getClosestValues";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.val === nextProps.val &&
    prevProps.rowHovered === nextProps.rowHovered
  );
};

export const TableCell = react.memo(
  ({
    val,
    className,
    rowIndex,
    columnIndex,
    mainTableCell,
    symbol,
    setRowHovered,
    rowHovered,
  }) => {
    const { dispatch, matrix, rowsSum } = useContext(MatrixContext);
    const { closeValues, setCloseValues, x } = useContext(ClosevalsContext);
    return (
      <td
        data-columnindex={columnIndex}
        data-rowindex={rowIndex}
        data-symbol={symbol}
        className={`${className}
         ${rowHovered ? "percentage" : ""} 
         ${closeValues.some((item) => item.id === symbol) ? "hilight" : ""} `}
        // onMouseEnter={() => {
        //   if (mainTableCell)
        //     setCloseValues(getClosestValues(matrix, val, x, symbol));
        //   if (className === "aside") {
        //     setRowHovered(true);
        //   }
        // }}
        onMouseLeave={() => {
          className === "aside" && setRowHovered(false);
          setCloseValues([]);
        }}
      >
        {rowHovered ? Math.round((val / rowsSum[rowIndex]) * 100) + "%" : val}
      </td>
    );
  },
  areEqual
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
