import propTypes from "prop-types";
import react from "react";
import { ICell } from "../interfaces";

const areEqual = (prevProps, nextProps) => {
  return (
    nextProps.highlightCell === prevProps.highlightCell &&
    prevProps.val === nextProps.val &&
    prevProps.rowHovered === nextProps.rowHovered
  );
};

export const TableCell:react.FC<ICell> = react.memo(
  ({
    val,
    className,
    rowIndex,
    columnIndex,
    ident,
    rowHovered,
    highlightCell,
    valuePercent,
  }) => {
    //console.log("cell", rowIndex, " ", columnIndex);
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
         ${highlightCell ? "hilight" : ""} `}
      >
        {rowHovered === rowIndex && className === "main-cell"
          ? valuePercent
          : val}
      </td>
    );
  },
  areEqual
);

// TableCell.propTypes = {
//   val: propTypes.number,
//   className: propTypes.string,
//   rowIndex: propTypes.number,
//   columnIndex: propTypes.number,
//   id: propTypes.string,
//   rowHovered: propTypes.number,
//   highlightCell: propTypes.bool,
// };
