import propTypes from "prop-types";
import react from "react";
import { RowProps } from "../interfaces.js";
import { TableCell } from "./TableCell";

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
    prevProps.rowHovered !== prevProps.i &&
    nextProps.rowHovered !== nextProps.i &&
    prevProps.i === nextProps.i
  );
};

export const TableRow:React.FC<RowProps>= react.memo(
  ({ i, row, rowHovered, closeValues, dispatch, rowsSum }) => {
    //console.log("row " + i);
    return (
      <tr key={i}>
        {row.map((col, j) => {
          return (
            <TableCell
            val={col.amount}
              className="main-cell"
              key={col.id}
          
              ident={col.id}
              highlightCell={closeValues?.some((item) => {
                return item.id === col.id;
              })}
              rowIndex={i}
              columnIndex={j}
              rowHovered={rowHovered}
              closeValues={closeValues}
              valuePercent={Math.round((col.amount / rowsSum[i]) * 100) + "%"}
            />
          );
        })}
        <TableCell className="aside" val={rowsSum[i]} rowIndex={i} />
        <td className="button-cell">
          <button
            onClick={() =>
              dispatch({ type: "DELETE_ROW", payload: { rowToDel: i } })
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

// TableRow.propTypes = {
//   i: propTypes.number,
//   row: propTypes.array,
//   closeValues: propTypes.array,
//   rowHovered: propTypes.number,
// };
