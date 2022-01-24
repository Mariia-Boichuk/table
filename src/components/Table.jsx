import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.jsx";
import { TableRow } from "./TableRow.jsx";

import { ClosevalsContext } from "../context/ClosevalsContextProvider.jsx";

export const Table = () => {
  const { matrix, columnsSum, dispatch, rowsSum } = useContext(MatrixContext);
  const { dispatchCloseValues, numberOfValues, closeValues } =
    useContext(ClosevalsContext);
  const [rowHovered, setRowHovered] = useState(-1);

  const handleClick = (e) => {
    if (e.target.classList.contains("main-cell")) {
      dispatch({
        type: "INCREMENT_CELL",
        payload: {
          rowIndex: +e.target.dataset.rowindex,
          columnIndex: +e.target.dataset.columnindex,
        },
      });
    }
  };

  const handleHover = (e) => {
    const targetCell = e.target.innerText;
    const id = e.target.dataset.ident;
    if (e.target.classList.contains("main-cell")) {
      dispatchCloseValues({
        type: "GENERATE_VALUES",
        payload: { matrix, targetCell, numberOfValues: +numberOfValues, id },
      });
    }
    if (e.target.classList.contains("aside")) {
      setRowHovered(+e.target.dataset.rowindex);
      dispatchCloseValues({ type: "CLEAR_VALUES" });
    }
  };

  const handleOut = (e) => {
    if (e.target.classList.contains("aside")) setRowHovered(-1);
    // dispatchCloseValues({ type: "CLEAR_VALUES" });
  };
  const handleLeave = (e) => {
    dispatchCloseValues({ type: "CLEAR_VALUES" });
  };

  return (
    <table
      className="wrapper"
      onClick={handleClick}
      onMouseOver={handleHover}
      onMouseOut={handleOut}
      onMouseLeave={handleLeave}
    >
      <tbody>
        {matrix.map((item, i) => (
          <TableRow
            key={item.id}
            rowIndex={i}
            row={item.row}
            rowHovered={rowHovered}
            closeValues={closeValues}
            rowsSum={rowsSum}
            dispatch={dispatch}
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
