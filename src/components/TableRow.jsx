import propTypes from "prop-types";
import react from "react";
import { TableCell } from "./TableCell.jsx";

const areEqual = (prevProps, nextProps) => {
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

export const TableRow = react.memo(
  ({ rowIndex, row, rowHovered, closeValues, dispatch, rowsSum }) => {
    // console.log("row   ", rowIndex);
    return (
      <tr>
        {row.map((col, j) => {
          return (
            <TableCell
              rowsSum={rowsSum}
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
              closeValues={closeValues}
              valuePercent={
                Math.round((col.amount / rowsSum[rowIndex]) * 100) + "%"
              }
            />
          );
        })}
        <TableCell
          className="aside"
          val={rowsSum[rowIndex]}
          rowIndex={rowIndex}
        />
        <td className="button-cell">
          <button
            onClick={() =>
              dispatch({ type: "DELETE_ROW", payload: { rowToDel: rowIndex } })
            }
          >
            delete row
          </button>
        </td>
      </tr>
    );
  },
  areEqual
);

TableRow.propTypes = {
  i: propTypes.number,
  row: propTypes.array,
  closeValues: propTypes.array,
  rowHovered: propTypes.number,
};
