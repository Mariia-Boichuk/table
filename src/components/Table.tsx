import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider.jsx";
import { TableCell } from "./TableCell.tsx";
import { TableRow } from "./TableRow.tsx";
import { ClosevalsContext } from "../context/ClosevalsContextProvider.tsx";

export const Table:React.FC = () => {
  const { matrix, columnsSum, dispatch } = useContext(MatrixContext);
  const { dispatchCloseValues, numberOfValues, closeValues } =
    useContext(ClosevalsContext);
  const [rowHovered, setRowHovered] = useState(-1);

  const handleClick = (e) => {
    if (e.target.classList.contains("button")) {
      const rowToDel = +e.target.dataset.rowindex
      dispatch({
        type: "DELETE_ROW",
        payload: { rowToDel},
      });
    }
    if (e.target.classList.contains("main-cell")) {

     const rowIndex = +e.target.dataset.rowindex
     const columnIndex = +e.target.dataset.columnindex
      dispatch({
        type: "INCREMENT_CELL",
        payload: {
          rowIndex,
          columnIndex,
        },
      });
    }
  };

  const handleHover = (e) => {
    const targetCell:string = e.target.innerText;
    const id:string = e.target.dataset.ident;
    if (e.target.classList.contains("main-cell")) {
      dispatchCloseValues({
        type: "GENERATE_VALUES",
        payload: { matrix, targetCell:+targetCell, numberOfValues: +numberOfValues, id },
      });
    }
    if (e.target.classList.contains("aside")) {
      setRowHovered(+e.target.dataset.rowindex);
      dispatchCloseValues({ type: "CLEAR_VALUES" });
    }
  };

  const handleOut = (e) => {
    if (e.target.classList.contains("aside")) setRowHovered(-1);
  };
  const handleLeave = () => {
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
            rowHovered={rowHovered===i}
            closeValues={closeValues}
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
