"use client";

import { createContext, useState, useContext } from "react";

const MoveContext = createContext();

export const useMove = () => useContext(MoveContext);

export default function MoveProvider({ children }) {
  const [move, setMove] = useState(false);
  const [scrollParams, setScrollParams] = useState(null);

  const handleMove = () => {
    setMove((prev) => !prev);
   
  };

  return (
    <MoveContext.Provider value={{ move, handleMove ,scrollParams,setScrollParams }}>
      {children}
    </MoveContext.Provider>
  );
}
