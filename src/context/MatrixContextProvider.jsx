import React, { createContext, useMemo, useReducer } from "react";
import { generateElement, genMatrix } from "../helpers/genMatrix";

export const MatrixContext = createContext();

export const matrixReducer = (state, action) => {
  const { i, j } = action.payload;

  switch (action.type) {
    case "INCREMENT_CELL":
      const mat = state.MATRIX.map((item, index) => {
        return item.map((itemCell, jCell) => {
          if (index === i && jCell === j)
            return { ...itemCell, amount: itemCell.amount + 1 };
          return itemCell;
        });
      });
      return { ...state, MATRIX: mat };

    case "DELETE_ROW":
      const { rowToDel } = action.payload;
      const matrix1 = state.MATRIX.filter((item, index) => {
        return index !== rowToDel;
      });
      return { ...state, MATRIX: matrix1 };

    case "ADD_ROW":
      const { n } = action.payload;
      const newRow = Array.from({ length: n }, () => generateElement());
      return { ...state, MATRIX: [...state.MATRIX, newRow] };

    case "CREATE_MATRIX":
      let matrix = genMatrix(action.payload.m, action.payload.n);
      //console.log(matrix);
      return { ...state, MATRIX: matrix };

    default:
      return state;
  }
};

export const MatrixContextProvider = (props) => {
  const [matrixState, dispatch] = useReducer(matrixReducer, {
    MATRIX: [],
  });
  const matrix = matrixState.MATRIX;
  const rowsSum = useMemo(() => {
    return matrix.map((row) => {
      return row.reduce((a, b) => {
        return a + b.amount;
      }, 0);
    });
  }, [matrix, matrix.length]);

  const columnsSum = useMemo(() => {
    return matrix.reduce((acc, item) => {
      item.forEach((el, i) => {
        acc[i] = (acc[i] || 0) + el.amount;
      });
      return acc;
    }, []);
  }, [matrix]);

  const value = useMemo(
    () => ({
      rowsSum,
      columnsSum,
      matrix: matrixState.MATRIX,
      dispatch,
    }),
    [rowsSum, columnsSum, matrixState, dispatch]
  );

  return (
    <MatrixContext.Provider value={value}>
      {props.children}
    </MatrixContext.Provider>
  );
};
