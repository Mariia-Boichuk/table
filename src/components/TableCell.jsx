import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";

export const TableCell = ({ val, className, i, j }) => {
  const {
    n,
    m,
    setm,
    setn,
    matrix,
    rowsSum,
    columnsSum,
    setmatrix2,
    dispatch,
  } = useContext(MatrixContext);
  return (
    <td
      className={className}
      onClick={() => {
        dispatch({ type: "INCRECELL", payload: { i, j, val, n, m } });

        console.log("clickeed");
      }}
    >
      {val}
    </td>
  );
};
