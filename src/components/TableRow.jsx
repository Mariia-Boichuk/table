import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

export const TableRow = ({ i, row }) => {
  const { rowsSum } = useContext(MatrixContext);

  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            key={j}
            val={col.amount}
            symbol={col.id}
            i={i}
            j={j}
            mainTableCell={true}
            // className={
            //   matrixState.valuesToHightLight.includes(col.amount)
            //     ? "hilight"
            //     : ""
            // }
          />
        );
      })}
      <TableCell className="aside" val={rowsSum[i]} />
    </tr>
  );
};
