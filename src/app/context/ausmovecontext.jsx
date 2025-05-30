"use client";

import { createContext, useState, useContext } from "react";

const MoveContext = createContext();

export const useMove = () => useContext(MoveContext);

export default function MoveProvider({ children }) {
  const [move, setMove] = useState(false);

  const handleMove = () => {
    setMove((prev) => !prev);
   
  };

  return (
    <MoveContext.Provider value={{ move, handleMove }}>
      {children}
    </MoveContext.Provider>
  );
}
