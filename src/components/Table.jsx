import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";
import { TableRow } from "./TableRow.jsx";

export const Table = () => {
  const { matrix, columnsSum } = useContext(MatrixContext);
  return (
    <table className="wrapper">
      <tbody>
        {matrix.map((row, i) => (
          <TableRow key={i} i={i} row={row} />
        ))}
        {columnsSum.map((el, i) => (
          <TableCell className="below" i={i} val={el} />
        ))}
      </tbody>
    </table>
  );
};
