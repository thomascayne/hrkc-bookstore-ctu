// contexts/SidePanelContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidePanelContextType {
  isOpen: boolean;
  openPanel: (content: ReactNode) => void;
  closePanel: () => void;
  content: ReactNode;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(
  undefined
);

export const SidePanelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openPanel = (newContent: ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <SidePanelContext.Provider
      value={{ isOpen, openPanel, closePanel, content }}
    >
      {children}
    </SidePanelContext.Provider>
  );
};

export const useSidePanel = () => {
  const context = useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error("useSidePanel must be used within a SidePanelProvider");
  }
  return context;
};
