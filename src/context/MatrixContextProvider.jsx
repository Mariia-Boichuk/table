import React, { createContext, useMemo, useReducer, useState } from "react";

export const MatrixContext = createContext();

const genMatrix = (m, n) => {
  const result = [];

  for (let i = 0; i < m; i++) {
    result[i] = [];

    for (let j = 0; j < n; j++) {
      const cellValue = Math.floor(Math.random() * (999 - 100) + 100);

      result[i][j] = {
        id: Symbol(),
        amount: cellValue,
      };
    }
  }

  return result;
};

export const matrixReducer = (state, action) => {
  switch (action.type) {
    case "INCRECELL":
      console.log("GG");
      return { ...state, INCRECELL: true };

    default:
      return state;
  }
};

export const MatrixContextProvider = (props) => {
  const [m, setm] = useState(2);
  const [n, setn] = useState(3);
  let matrix = useMemo(() => genMatrix(m, n), [m, n]);

  const [matrixtate, dispatch] = useReducer(matrixReducer, {});

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
    }),
    [n, m, rowsSum, columnsSum, matrix]
  );

  return (
    <MatrixContext.Provider value={value}>
      {props.children}
    </MatrixContext.Provider>
  );
};
