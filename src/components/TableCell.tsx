
import react from "react";

 interface ICell {
  val:number,
  className:string,
  rowIndex:number
  columnIndex?:number,
  ident?:string,
  rowHovered?:number,
  highlightCell?:boolean,
  valuePercent?:string,
}

const areEqual = (prevProps:ICell, nextProps:ICell):boolean => {
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
        className={`${className} ${
          rowHovered === rowIndex && className === "main-cell"
            ? "percentage"
            : ""
        } ${highlightCell ? "hilight" : ""} `}
      >
        {rowHovered === rowIndex && className === "main-cell"
          ? valuePercent
          : val}
      </td>
    );
  },
  areEqual
);

