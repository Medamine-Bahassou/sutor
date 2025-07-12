"use client";

import React, { createContext, useContext, useState } from "react";

const LatexContext = createContext<{
  latexContent: string | null;
  setLatexContent: (content: string | null) => void;
}>({
  latexContent: null,
  setLatexContent: () => {},
});

export const LatexProvider = ({ children }: { children: React.ReactNode }) => {
  const [latexContent, setLatexContent] = useState<string | null>(null);

  return (
    <LatexContext.Provider value={{ latexContent, setLatexContent }}>
      {children}
    </LatexContext.Provider>
  );
};

export const useLatex = () => useContext(LatexContext);
