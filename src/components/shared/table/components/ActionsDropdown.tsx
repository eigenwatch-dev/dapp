/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { TableAction } from "../ReuseableTable";

type ActionsDropdownProps = {
  actions: TableAction[];
  row: any;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number } | null;
};

export const ActionsDropdown = ({
  actions,
  row,
  isOpen,
  onClose,
  position,
}: ActionsDropdownProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={onClose} />
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`${
              position ? "fixed" : "absolute right-0 top-full mt-1"
            } z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] flex flex-col gap-2 py-[12px] px-2`}
            style={
              position
                ? {
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: "translate(-50%, 10px)",
                  }
                : {}
            }
          >
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // action.handler({ openDrawer, data: { row } });
                  onClose();
                }}
                className={`${
                  action.className ||
                  "text-[#333333] text-[14px] w-[245px] h-[40px] p-[6px] text-left flex hover:bg-gray-100 rounded-sm"
                }`}
              >
                {action.icon && (
                  <span className="mr-[8px] my-auto">{action.icon}</span>
                )}
                <span className="my-auto">{action.label}</span>
                <ChevronRight className="ml-auto my-auto h-4 w-4 text-gray-500" />
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
