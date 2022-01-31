import React, { createContext, useMemo, useReducer } from "react";
import {
  deleteRow,
  generateElement,
  genMatrix,
  incrementOneCell,
} from "../helpers/genMatrix";
import { v4 as uuidv4 } from "uuid";
import { Matrix } from "../helpers/interfaces";

type MatrixInitState = {
  MATRIX: Matrix;
};

type MatrixActionType =
  | {
      type: "INCREMENT_CELL";
      payload: { rowIndex: number; columnIndex: number };
    }
  | { type: "DELETE_ROW"; payload: { rowToDel: number } }
  | {
      type: "CREATE_MATRIX";
      payload: { rowsQuantity: number; columnsQuantity: number };
    }
  | { type: "ADD_ROW"; payload: { columnsQuantity } };

type MatrixGlobalContent = {
  columnsSum: number[];
  matrix: Matrix;
  dispatch: React.Dispatch<MatrixActionType>;
};

export const MatrixContext = createContext<MatrixGlobalContent>({
  columnsSum: [],
  matrix: [],
  dispatch: () => {},
});

export const matrixReducer = (
  state: MatrixInitState,
  action: MatrixActionType
) => {
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

export const MatrixContextProvider: React.FC = (props) => {
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
