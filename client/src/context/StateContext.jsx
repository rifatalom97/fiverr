"use client";
import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./StateReducer";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export function useStateProvider() {
  const state = useContext(StateContext);
  if (state === undefined) {
    throw new Error("useStateProvider must be used within a StateProvider");
  }
  return state;
}
