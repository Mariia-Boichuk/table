import React, { createContext, useMemo, useReducer } from "react";
import { genereteElement, genMatrix } from "../helpers/genMatrix";

export const MatrixContext = createContext();

export const matrixReducer = (state, action) => {
  const { i, j } = action.payload;

  switch (action.type) {
    case "INCRECELL":
      const mat = state.MATRIX.map((item, index) => {
        item.map((itemCell, jCell) => {
          if (index === i && jCell === j) itemCell.amount += 1;
          return itemCell;
        });
        return item;
      });
      return { ...state, MATRIX: mat };

    case "DELETE_ROW":
      const { rowToDel } = action.payload;
      const matrix1 = state.MATRIX.filter((item, index) => {
        return index !== rowToDel - 1;
      });
      return { ...state, MATRIX: matrix1 };

    case "ADD_ROW":
      const { m, n } = action.payload;
      const newRow = [];
      for (let index = 0; index < n; index++) {
        newRow[index] = genereteElement();
      }
      state.MATRIX.push(newRow);
      return { ...state, MATRIX: [...state.MATRIX] };

    case "CREATE_MATRIX":
      console.log("create m");
      let matrix = genMatrix(action.payload.m, action.payload.n);
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
  }, [matrix]);

  const columnsSum = useMemo(() => {
    return matrix.reduce((row, ind) => {
      ind.forEach((el, i) => {
        row[i] = (row[i] || 0) + el.amount;
      });
      return row;
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
