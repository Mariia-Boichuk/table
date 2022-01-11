import propTypes from "prop-types";
import react from "react";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

const areEqual = (prevProps, nextProps) => {
  return prevProps.row.every((item, index) => {
    //  console.log("hhok", item.amount, nextProps.row[index].amount);
    return item.amount === nextProps.row[index].amount;
  });
};

export const TableRow = react.memo(({ i, row }) => {
  const { rowsSum, dispatch } = useContext(MatrixContext);
  const [rowHovered, setRowHovered] = useState(false);
  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            className={`main-cell ${rowHovered && "percentage"}`}
            key={`${i}${j}`}
            val={col.amount}
            symbol={col.id}
            i={i}
            j={j}
            mainTableCell={true}
            rowHovered={rowHovered}
          />
        );
      })}
      <TableCell
        className="aside"
        val={rowsSum[i]}
        setRowHovered={setRowHovered}
      />
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
