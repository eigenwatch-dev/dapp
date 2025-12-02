/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DrawerContainer } from "../../DrawerContainer";

type TableDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  currentTab: any;
  selectedRow: any;
};

export const TableDrawer = ({
  isOpen,
  onClose,
  currentTab,
  selectedRow,
}: TableDrawerProps) => {
  if (!currentTab.drawerContent) {
    return null;
  }

  return (
    <DrawerContainer onClose={onClose} isOpen={isOpen}>
      {currentTab.drawerContent(
        currentTab.rawData?.filter(
          (rowData: any) =>
            (rowData as any)?.[currentTab.idKey || ""] ===
            selectedRow?.[currentTab.idKey || ""]
        )[0] || selectedRow
      )}
    </DrawerContainer>
  );
};
