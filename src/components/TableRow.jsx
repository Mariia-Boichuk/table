import propTypes from "prop-types";
import react from "react";
import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

const areEqual = (prevProps, nextProps) => {
  const mas = nextProps.row.some((col, j) => {
    return nextProps.closeValues.some((item) => {
      return item.id === col.id;
    });
  });

  return (
    !mas &&
    prevProps.rowHovered === nextProps.rowHovered &&
    prevProps.row.every((item, index) => {
      return item.amount === nextProps.row[index].amount;
    })
  );
};

export const TableRow = react.memo(({ i, row, rowHovered, closeValues }) => {
  const { rowsSum, dispatch } = useContext(MatrixContext);
  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            className="main-cell"
            key={col.id}
            val={col.amount}
            ident={col.id}
            highlightCell={
              closeValues?.some((item) => {
                return item.id === col.id;
              })
                ? true
                : false
            }
            rowIndex={i}
            columnIndex={j}
            rowHovered={rowHovered}
            closeValues={closeValues}
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
  closeValues: propTypes.array,
  rowHovered: propTypes.number,
};
