// components/SidePanel.tsx
"use client";

import { useSidePanel } from "@/app/contexts/SidePanelContext";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const SidePanel: React.FC = () => {
  const { isOpen, closePanel, content } = useSidePanel();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 500);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={closePanel}
    >
      <div
        className="fixed top-0 left-0 w-full sm:w-96 md:w-[600px] lg:w-[768px] h-full bg-white dark:bg-gray-800 p-4 overflow-y-auto transition-transform duration-[500] ease-in-out transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePanel}
          className="absolute top-4 right-4 text-2xl hover:text-red-500 transition-all duration-150 ease-in-out"
        >
          <IoMdClose />
        </button>
        {content}
      </div>
    </div>
  );
};

export default SidePanel;
