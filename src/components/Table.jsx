import React from "react";
import { TableCell } from "./TableCell";

export const Table = ({ matrix, rowsSum, columnsSum }) => {
  return (
    <table className="wrapper">
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => {
              return <TableCell key={j} val={col.amount} />;
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
