import React, { useContext } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";

export const TableCell = ({ val, className, i, j, mainTableCell }) => {
  const { dispatch } = useContext(MatrixContext);
  return (
    <td
      className={className}
      onClick={
        mainTableCell
          ? () => {
              dispatch({ type: "INCRECELL", payload: { i, j } });
            }
          : undefined
      }
      onMouseOver={
        mainTableCell
          ? () => {
              console.log("hover");
              dispatch({ type: "HILIGHT_CLOSE_VALUES", payload: { i, j } });
            }
          : undefined
      }
    >
      {val}
    </td>
  );
};
