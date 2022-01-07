import propTypes from "prop-types";
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
        <tr>
          {columnsSum.map((el, i) => (
            <TableCell
              className="below"
              i={i}
              val={Math.floor(el / matrix.length)}
              key={i}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

Table.propTypes = {
  matrix: propTypes.array,
  columnsSum: propTypes.array,
};
