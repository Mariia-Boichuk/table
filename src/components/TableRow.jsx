import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";

export const TableRow = ({ i, row }) => {
  const { rowsSum } = useContext(MatrixContext);
  const [rowHovered, setrowHovered] = useState(false);
  return (
    <tr key={i}>
      {row.map((col, j) => {
        return (
          <TableCell
            key={j}
            val={
              rowHovered
                ? Math.round((col.amount / rowsSum[i]) * 100) + "%"
                : col.amount
            }
            symbol={col.id}
            i={i}
            j={j}
            mainTableCell={true}
          />
        );
      })}
      <TableCell
        className="aside"
        val={rowsSum[i]}
        i={i}
        setrowHovered={setrowHovered}
      />
    </tr>
  );
};
