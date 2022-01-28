import React, { createContext, useMemo, useReducer } from "react";
import { ITableItem } from "../helpers/interfaces";
import { getClosestValues, IArgs } from "../helpers/getClosestValues";

type InitState = {
  values: ITableItem[];
  numberOfValues: number;
};

type ActionType =
  | { type: "GENERATE_VALUES"; payload: IArgs }
  | { type: "CLEAR_VALUES" }
  | { type: "SET_NUMBER_OF_VALUES"; payload: { numberOfValues: number } };

type GlobalContent = {
  closeValues: ITableItem[];
  numberOfValues: number;
  dispatchCloseValues: React.Dispatch<ActionType>;
};

export const closestValuesReducer = (state: InitState, action: ActionType) => {
  switch (action.type) {
    case "GENERATE_VALUES":
      const values = getClosestValues(action.payload);
      return { ...state, values };

    case "CLEAR_VALUES":
      return { ...state, values: [] };

    case "SET_NUMBER_OF_VALUES":
      const { numberOfValues } = action.payload;
      return { ...state, numberOfValues };

    default:
      return state;
  }
};

export const ClosevalsContext = createContext<GlobalContent>({
  closeValues: [],
  numberOfValues: 6,
  dispatchCloseValues: () => {},
});

export const ClosevalsContextProvider: React.FC = (props) => {
  const [closeValsState, dispatchCloseValues] = useReducer(
    closestValuesReducer,
    {
      values: [],
      numberOfValues: 4,
    }
  );

  const value = useMemo(
    () => ({
      closeValues: closeValsState.values,
      numberOfValues: closeValsState.numberOfValues,
      dispatchCloseValues,
    }),
    [closeValsState.values, closeValsState.numberOfValues]
  );

  return (
    <ClosevalsContext.Provider value={value}>
      {props.children}
    </ClosevalsContext.Provider>
  );
};
