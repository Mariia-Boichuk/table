import propTypes from "prop-types";
import react from "react";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

const areEqual = (prevProps, nextProps) => {
  // return prevProps.row.every((item, index) => {
  //   return item.amount === nextProps.row[index].amount;
  // });
  return false;
};

export const TableRow = react.memo(({ i, row, rowHovered }) => {
  const { rowsSum, dispatch } = useContext(MatrixContext);
  console.log("tablerow", rowHovered);

  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            className="main-cell"
            key={`${i}${j}`}
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
