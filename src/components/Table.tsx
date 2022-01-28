import propTypes from "prop-types";
import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";

export const Table: React.FC = () => {
  const { matrix, columnsSum, dispatch } = useContext(MatrixContext);
  const { dispatchCloseValues, numberOfValues, closeValues } =
    useContext(ClosevalsContext);
  const [rowHovered, setRowHovered] = useState<number>(-1);

  const handleClick = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLTableCellElement;
    if (target.classList.contains("button")) {
      const rowToDel = +target.dataset.rowindex;
      dispatch({
        type: "DELETE_ROW",
        payload: { rowToDel },
      });
    }
    if (target.classList.contains("main-cell")) {
      const rowIndex = +target.dataset.rowindex;
      const columnIndex = +target.dataset.columnindex;
      dispatch({
        type: "INCREMENT_CELL",
        payload: {
          rowIndex,
          columnIndex,
        },
      });
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLTableCellElement;
    const targetCell: string = target.innerText;
    const id: string = target.dataset.ident;

    if (target.classList.contains("main-cell")) {
      dispatchCloseValues({
        type: "GENERATE_VALUES",
        payload: {
          matrix,
          targetCell: +targetCell,
          numberOfValues: +numberOfValues,
          id,
        },
      });
    }
    if (target.classList.contains("aside")) {
      setRowHovered(+target.dataset.rowindex);
      dispatchCloseValues({ type: "CLEAR_VALUES" });
    }
  };

  const handleOut = (e: React.MouseEvent<HTMLTableElement>) => {
    if ((e.target as HTMLTableCellElement).classList.contains("aside"))
      setRowHovered(-1);
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
            rowHovered={rowHovered === i}
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
