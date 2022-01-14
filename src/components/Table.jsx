import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";
import { TableRow } from "./TableRow.jsx";
import { getClosestValues } from "../helpers/getClosestValues";

export const Table = ({ x }) => {
  const { matrix, columnsSum, dispatch } = useContext(MatrixContext);
  const [rowHovered, setRowHovered] = useState(-1);
  const [closeValues, setCloseValues] = useState([]);
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
    const ident = e.target.dataset.ident;
    if (e.target.classList.contains("main-cell")) {
      const cv = getClosestValues(matrix, cellValue, x, ident);
      setCloseValues(cv);
    }
    if (e.target.classList.contains("aside")) {
      setRowHovered(+e.target.dataset.rowindex);
      setCloseValues([]);
    }
  };

  const handleMouseOut = (e) => {
    if (e.target.classList.contains("aside")) setRowHovered(-1);
  };

  const handleMouseLeave = (e) => {
    setCloseValues([]);
  };

  return (
    <table
      className="wrapper"
      onClick={handleClick}
      onMouseOver={handleHover}
      onMouseOut={handleMouseOut}
      onMouseLeave={handleMouseLeave}
    >
      <tbody>
        {matrix.map((row, i) => (
          <TableRow
            key={row[0].idForRow}
            i={i}
            row={row}
            rowHovered={rowHovered}
            closeValues={closeValues}
          />
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
