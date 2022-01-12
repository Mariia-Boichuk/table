import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";
import { TableRow } from "./TableRow.jsx";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";
import { getClosestValues } from "../helpers/getClosestValues";

export const Table = () => {
  const { setCloseValues, x } = useContext(ClosevalsContext);
  const { matrix, columnsSum, dispatch } = useContext(MatrixContext);
  const [rowHovered, setRowHovered] = useState(null);

  const handleClick = (e) => {
    if (e.target.classList.contains("main-cell")) {
      dispatch({
        type: "INCREMENT_CELL",
        payload: {
          i: +e.target.dataset.rowindex,
          j: +e.target.dataset.columnindex,
        },
      });
    }
  };

  const handleHover = (e) => {
    const cellValue = e.target.innerText;
    const symbol = e.target.dataset.symbol;

    if (e.target.classList.contains("main-cell"))
      setCloseValues(getClosestValues(matrix, cellValue, x, symbol));
    if (e.target.classList.contains("aside")) {
      setRowHovered(+e.target.dataset.rowindex);
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.classList.contains("aside")) setRowHovered(false);
    setCloseValues([]);
  };

  return (
    <table
      className="wrapper"
      onClick={handleClick}
      onMouseOver={handleHover}
      onMouseOut={handleMouseLeave}
    >
      <tbody>
        {matrix.map((row, i) => (
          <TableRow key={i} i={i} row={row} rowHovered={rowHovered} />
        ))}
        <tr>
          {columnsSum.map((el, i) => (
            <TableCell
              className="below"
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
