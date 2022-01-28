import React, { createContext, useMemo, useReducer } from "react";
import {
  deleteRow,
  generateElement,
  genMatrix,
  incrementOneCell,
} from "../helpers/genMatrix.ts";
import { v4 as uuidv4 } from "uuid";

export const MatrixContext = createContext();

export const matrixReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_CELL":
      const { rowIndex, columnIndex } = action.payload;
      return {
        ...state,
        MATRIX: incrementOneCell(state.MATRIX, rowIndex, columnIndex),
      };

    case "DELETE_ROW":
      const { rowToDel } = action.payload;
      return { ...state, MATRIX: deleteRow(state.MATRIX, rowToDel) };

    case "ADD_ROW":
      const row = Array.from(
        { length: action.payload.columnsQuantity },
        generateElement
      );
      return {
        ...state,
        MATRIX: [...state.MATRIX, { id: uuidv4(), row }],
      };

    case "CREATE_MATRIX":
      const { rowsQuantity, columnsQuantity } = action.payload;
      return {
        ...state,
        MATRIX: genMatrix(rowsQuantity, columnsQuantity),
      };

    default:
      return state;
  }
};

export const MatrixContextProvider = (props) => {
  const [matrixState, dispatch] = useReducer(matrixReducer, {
    MATRIX: [],
  });

  const columnsSum = useMemo(() => {
    return matrixState.MATRIX.reduce((acc, item) => {
      item.row?.forEach((el, i) => {
        acc[i] = (acc[i] || 0) + el.amount;
      });
      return acc;
    }, []);
  }, [matrixState.MATRIX]);

  const value = useMemo(
    () => ({
      columnsSum,
      matrix: matrixState.MATRIX,
      dispatch,
    }),
    [columnsSum, matrixState, dispatch]
  );

  return (
    <MatrixContext.Provider value={value}>
      {props.children}
    </MatrixContext.Provider>
  );
};
