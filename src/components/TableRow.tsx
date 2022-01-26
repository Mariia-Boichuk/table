
import react, { useMemo } from "react";
import { ITableItem } from "../helpers/interfaces";
import { TableCell } from "./TableCell.tsx";

interface RowProps {rowIndex:number, row:ITableItem[], rowHovered:number,closeValues:ITableItem[],dispatch:Function, rowsSum:Array<number>}

const areEqual = (prevProps:RowProps, nextProps:RowProps):boolean => {
  const next = nextProps.row.some((col, j) => {
    return nextProps.closeValues?.some((item) => {
      return item.id === col.id;
    });
  });
  const prev = prevProps.row.some((col, j) => {
    return prevProps.closeValues?.some((item) => {
      return item.id === col.id;
    });
  });

  return (
    !next &&
    !prev &&
    prevProps.rowIndex !== prevProps.rowHovered &&
    nextProps.rowIndex !== nextProps.rowHovered &&
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.row.map((el) => el.amount).toString() ===
      nextProps.row.map((el) => el.amount).toString()
  );
};

export const TableRow:react.FC<RowProps> = react.memo(
  ({ rowIndex, row, rowHovered, closeValues }) => {
    const rowSum = useMemo(
      () =>
        row.reduce((a, b) => {
          return a + b.amount;
        }, 0),
      [row]
    );

    // console.log("row   ", rowIndex);
    return (
      <tr>
        {row.map((col, j) => {
          return (
            <TableCell
              className="main-cell"
              key={col.id}
              val={col.amount}
              ident={col.id}
              highlightCell={closeValues?.some((item) => {
                return item.id === col.id;
              })}
              rowIndex={rowIndex}
              columnIndex={j}
              rowHovered={rowHovered}
              valuePercent={Math.round((col.amount / rowSum) * 100) + "%"}
            />
          );
        })}
        <TableCell className="aside" val={rowSum} rowIndex={rowIndex} />
        <td className="button-cell">
          <button className="button" data-rowindex={rowIndex}>
            delete row
          </button>
        </td>
      </tr>
    );
  },
  areEqual
);

// TableRow.propTypes = {
//   i: propTypes.number,
//   row: propTypes.array,
//   closeValues: propTypes.array,
//   rowHovered: propTypes.number,
// };
