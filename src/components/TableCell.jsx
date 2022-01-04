import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";

export const TableCell = ({ val, className, i, j }) => {
  const { dispatch } = useContext(MatrixContext);
  return (
    <td
      className={className}
      onClick={() => {
        dispatch({ type: "INCRECELL", payload: { i, j } });
      }}
    >
      {val}
    </td>
  );
};
