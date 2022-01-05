import React, { createContext, useMemo, useState } from "react";

export const ClosevalsContext = createContext();

export const ClosevalsContextProvider = (props) => {
  const [closeValues, setCloseValues] = useState([]);
  const [x, setx] = useState(2);
  const value = useMemo(
    () => ({ closeValues, setCloseValues, x, setx }),
    [closeValues, x]
  );

  return (
    <ClosevalsContext.Provider value={value}>
      {props.children}
    </ClosevalsContext.Provider>
  );
};
