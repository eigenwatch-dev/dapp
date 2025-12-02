/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { getDropdownPosition } from "../utils/tableUtils";

export type UseTableActionsProps = {
  currentTab: any;
  onRowClick?: (row: any) => void;
  setDropdownPosition?: (pos: { x: number; y: number } | null) => void;
  setOpenDropdownId?: (id: string | null) => void;
};
export const useTableActions = ({
  currentTab,
  onRowClick,
  setDropdownPosition,
}: UseTableActionsProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const hasActions = currentTab.actions && currentTab.actions.length > 0;
  const shouldUseRowClickForActions = hasActions && !currentTab.drawerContent;

  const handleRowClick = useCallback(
    (e: React.MouseEvent, row: any) => {
      if (shouldUseRowClickForActions) {
        const position = getDropdownPosition(e);
        if (setDropdownPosition) setDropdownPosition(position);
        setOpenDropdownId(row[currentTab.idKey!]);
      }
      onRowClick?.(row);
    },
    [
      shouldUseRowClickForActions,
      currentTab.idKey,
      onRowClick,
      setDropdownPosition,
    ]
  );

  return {
    openDropdownId,
    setOpenDropdownId,
    setDropdownPosition,
    handleRowClick,
  };
};
