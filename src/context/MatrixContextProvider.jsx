import React, { createContext, useMemo, useReducer, useState } from "react";
import { genMatrix } from "../helpers/genMatrix";
import { getClosestValues } from "../helpers/getClosestValues";

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

    case "CREATE_MATRIX":
      console.log("create m");
      let matrix = genMatrix(action.payload.m, action.payload.n);
      return { ...state, MATRIX: matrix };

    default:
      return state;
  }
};

export const MatrixContextProvider = (props) => {
  const [m, setm] = useState(5);
  const [n, setn] = useState(3);
  const [matrixState, dispatch] = useReducer(matrixReducer, {
    MATRIX: [],
    valuesToHightLight: [],
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
      setm,
      m,
      setn,
      n,
      rowsSum,
      columnsSum,
      matrix: matrixState.MATRIX,
      dispatch,
    }),
    [setm, m, setn, n, rowsSum, columnsSum, matrixState, dispatch]
  );

  return (
    <MatrixContext.Provider value={value}>
      {props.children}
    </MatrixContext.Provider>
  );
};
