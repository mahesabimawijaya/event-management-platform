"use client";

import { createContext, useState } from "react";

const PathContext = createContext();

const PathContextProvider = ({ children }) => {
  const [path, setPath] = useState("events");

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const Path = PathContext;
export default PathContextProvider;
