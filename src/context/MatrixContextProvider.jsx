import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

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
  const [x, setx] = useState(3);
  const [matrixtate, dispatch] = useReducer(matrixReducer, {});

  let matrix = useMemo(() => {
    return genMatrix(m, n);
  }, [m, n]);

  console.log("incree ", matrixtate.INCRECELL);
  if (matrixtate.INCRECELL) {
    console.log("incree if ", matrixtate.INCRECELL);
    matrix["1"]["1"].amount = 222;
    console.log(matrix);
  }
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
