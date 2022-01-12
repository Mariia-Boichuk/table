import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.rowHovered === nextProps.rowHovered &&
    prevProps.row.every((item, index) => {
      return item.amount === nextProps.row[index].amount;
    })
  );
};

export const TableRow = react.memo(({ i, row, rowHovered }) => {
  const { rowsSum, dispatch } = useContext(MatrixContext);

  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            className="main-cell"
            key={col.id}
            val={col.amount}
            symbol={col.id}
            rowIndex={i}
            columnIndex={j}
            mainTableCell={true}
            rowHovered={rowHovered}
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
}, areEqual);

TableRow.propTypes = {
  i: propTypes.number,
  row: propTypes.array,
};
