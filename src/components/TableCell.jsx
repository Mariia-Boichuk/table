import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import { MatrixContext } from "../context/MatrixContextProvider";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.val === nextProps.val &&
    prevProps.rowHovered === nextProps.rowHovered
  );
};

export const TableCell = react.memo(
  ({ val, className, rowIndex, columnIndex, symbol, rowHovered }) => {
    const { rowsSum } = useContext(MatrixContext);
    const { closeValues } = useContext(ClosevalsContext);

    return (
      <td
        data-columnindex={columnIndex}
        data-rowindex={rowIndex}
        data-symbol={symbol}
        className={`${className}
         ${
           rowHovered === rowIndex && className === "main-cell"
             ? "percentage"
             : ""
         } 
         ${closeValues.some((item) => item.id === symbol) ? "hilight" : ""} `}
      >
        {rowHovered === rowIndex && className === "main-cell"
          ? Math.round((val / rowsSum[rowIndex]) * 100) + "%"
          : val}
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
  symbol: propTypes.number,
  setRowHovered: propTypes.func,
};
