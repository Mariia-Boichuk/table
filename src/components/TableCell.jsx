import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.closeValues === nextProps.closeValues &&
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
    ident,
    rowHovered,
    closeValues,
  }) => {
    const { rowsSum } = useContext(MatrixContext);

    return (
      <td
        data-columnindex={columnIndex}
        data-rowindex={rowIndex}
        data-ident={ident}
        className={`${className}
         ${
           rowHovered === rowIndex && className === "main-cell"
             ? "percentage"
             : ""
         } 
         ${closeValues?.some((item) => item.id === ident) ? "hilight" : ""} `}
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
  id: propTypes.string,
  setRowHovered: propTypes.func,
};
