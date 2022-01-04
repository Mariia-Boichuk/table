import React, { createContext, useMemo, useReducer, useState } from "react";
import { genMatrix } from "../helpers/genMatrix";

export const MatrixContext = createContext();

export const matrixReducer = (state, action) => {
  switch (action.type) {
    case "INCRECELL":
      const { i, j } = action.payload;

      state[i][j].amount += 1;

      return [...state];

    case "CREATE_MATRIX":
      console.log("create m");
      let matrix = genMatrix(action.payload.m, action.payload.n);
      return matrix;

    default:
      return state;
  }
};

export const MatrixContextProvider = (props) => {
  const [m, setm] = useState(2);
  const [n, setn] = useState(3);
  const [x, setx] = useState(3);
  const [matrix, dispatch] = useReducer(matrixReducer, []);
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
      matrix,
      dispatch,
      x,
      setx,
    }),
    [n, m, rowsSum, columnsSum, matrix]
  );

  return (
    <MatrixContext.Provider value={value}>
      {props.children}
    </MatrixContext.Provider>
  );
};
