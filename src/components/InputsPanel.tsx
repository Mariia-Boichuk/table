import React, { useContext, useState } from "react";
import { MatrixContext } from "../context/MatrixContextProvider";
import { ClosevalsContext } from "../context/ClosevalsContextProvider";

export const InputsPanel = () => {
  const { dispatch } = useContext(MatrixContext);
  const { numberOfValues, dispatchCloseValues } = useContext(ClosevalsContext);
  const [rowsQuantity, setRowsQuantity] = useState<number>(5);
  const [columnsQuantity, setColumnsQuantity] = useState<number>(7);

  return (
    <div>
      <label>rows (m)</label>
      <input
        data-testid="rows-input"
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRowsQuantity(+e.target.value)
        }
        value={rowsQuantity}
      />

      <label>columns (n)</label>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setColumnsQuantity(+e.target.value)
        }
        value={columnsQuantity}
      />
      <label>X</label>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const numberOfValues = +e.target.value;
          dispatchCloseValues({
            type: "SET_NUMBER_OF_VALUES",
            payload: { numberOfValues },
          });
        }}
        value={numberOfValues}
      />

      <button
        onClick={() =>
          dispatch({
            type: "CREATE_MATRIX",
            payload: { rowsQuantity, columnsQuantity },
          })
        }
      >
        crete matrix
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "ADD_ROW",
            payload: { columnsQuantity },
          })
        }
      >
        add row
      </button>
    </div>
  );
};
