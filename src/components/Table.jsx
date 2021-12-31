import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

export const Table = () => {
  const { matrix, rowsSum, columnsSum } = useContext(MatrixContext);
  console.log("kk", matrix);
  return (
    <table className="wrapper">
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => {
              return <TableCell key={j} i={i} j={j} val={col.amount} />;
            })}
            <TableCell className="aside" val={rowsSum[i]} />
          </tr>
        ))}
        {columnsSum.map((el) => (
          <TableCell className="below" val={el} />
        ))}
      </tbody>
    </table>
  );
};
