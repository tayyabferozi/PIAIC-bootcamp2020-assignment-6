import React, { createContext, useReducer } from "react";
import Reducer, { initialState, State } from "./Reducer";

interface Context {
  state: State;
  dispatch: React.Dispatch<any>;
}

export const GlobalContext = createContext<Context>({
  state: initialState,
  dispatch: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
