import React, { createContext, useMemo, useReducer } from "react";
import { getClosestValues } from "../helpers/getClosestValues";
export const ClosevalsContext = createContext();

export const closestValuesReducer = (state, action) => {
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

export const ClosevalsContextProvider = (props) => {
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
