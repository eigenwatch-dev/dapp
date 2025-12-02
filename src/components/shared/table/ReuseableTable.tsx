/* eslint-disable @typescript-eslint/no-explicit-any */
// components/table/ReusableTable.tsx
"use client";
import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { ThreeDotsIcon } from "./components/ThreeDotsIcon";
import { ActionsDropdown } from "./components/ActionsDropdown";
import { useTableTabs } from "./hooks/useTableTabs";
import { useTableActions } from "./hooks/useTableActions";
import Pagination, { PaginationProps } from "./components/Pagination";
import TableFilters, { TableFiltersProps } from "./components/TableFilters";
import { getDropdownPosition } from "./utils/tableUtils";
import { Checkbox } from "@/components/ui/checkbox";
import useSelectionStore from "@/hooks/store/useSelect";
import { useBreakpoint } from "@/hooks/ui/useBreakpoints";
import { useMobileCardData } from "./components/useMobileCardData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BodySix from "@/components/typography/BodySix";

export type TableAction = {
  label: string;
  handler: (config: {
    openDrawer: () => void;
    data?: Record<string, any>;
  }) => void;
  className?: string;
  icon?: React.ReactNode;
};

export interface TableColumnConfig {
  key: string;
  displayName: string;
}

export type ReusableTableProps = {
  columns: TableColumnConfig[];
  data: Record<string, any>[];
  tableFilters: TableFiltersProps;
  actions?: TableAction[];
  idKey?: string;
  tableKey?: string;
  paginationProps?: PaginationProps;
  enableMultiSelect?: boolean;
  rawData?: Record<string, any>[][];
  onRowClick?: (row: any) => void;
  altTabs?: ReusableTableProps[];
};

const ReusableTable = ({
  columns: userColumns,
  data,
  actions = [],
  idKey = "id",
  tableKey = "default-table",
  paginationProps,
  tableFilters,
  enableMultiSelect,
  altTabs = [],
  onRowClick,
  rawData,
}: ReusableTableProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { isMaxMd } = useBreakpoint();
  const { currentTab, allTabs } = useTableTabs({
    userColumns,
    data,
    actions,
    idKey,
    tableKey,
    paginationProps,
    tableFilters,
    enableMultiSelect,
    onRowClick,
    rawData,
    altTabs,
    activeTab,
  });

  const { handleRowClick } = useTableActions({
    currentTab,
    onRowClick,
    setDropdownPosition,
  });

  const { toggleSelection, isSelected, selectAll, deselectAll } =
    useSelectionStore();

  const visibleIds = useMemo(
    () => currentTab.data.map((row) => row[currentTab.idKey]),
    [currentTab.data, currentTab.idKey]
  );

  const allSelected = visibleIds.every((id) =>
    isSelected(currentTab.tableKey, id)
  );

  const hasMultipleActions =
    currentTab.actions && currentTab.actions.length > 1;

  const columns = useMemo(() => {
    const hasActions = currentTab.actions && currentTab.actions.length > 0;
    const shouldUseRowClickForActions = hasActions;

    // Prepare actions with View Details if needed
    const actionsToUse = [...(currentTab.actions || [])];

    const handleHeaderToggle = () => {
      if (allSelected) {
        deselectAll(currentTab.tableKey, visibleIds);
      } else {
        selectAll(currentTab.tableKey, visibleIds);
      }
    };

    const formattedColumns = [
      // Selection/S/N column
      ...(currentTab.enableMultiSelect
        ? [
            {
              id: "select",
              header: () => (
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleHeaderToggle}
                />
              ),
              cell: ({ row }: { row: any }) => {
                const id = row.original[currentTab.idKey];
                return (
                  <Checkbox
                    checked={isSelected(currentTab.tableKey, id)}
                    onCheckedChange={() =>
                      toggleSelection(currentTab.tableKey, id)
                    }
                  />
                );
              },
              enableSorting: false,
            },
          ]
        : []),

      // User defined columns
      ...currentTab.columns.map((col) => ({
        accessorKey: col.key,
        header: () => col.displayName,
        cell: (info: { getValue: () => any }) => info.getValue(),
      })),
    ];

    // Add actions column if actions are provided
    if (actionsToUse.length > 0) {
      formattedColumns.push({
        id: "actions",
        header: () => <span></span>,
        cell: ({ row }: { row: { original: Record<string, any> } }) => {
          console.log({ row });

          const rowId = row.original[currentTab.idKey];
          const isDropdownOpen = openDropdownId === rowId;

          return (
            <div className="relative flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId(isDropdownOpen ? null : rowId);
                  setDropdownPosition(getDropdownPosition(e));
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors rotate-90"
                aria-label="More actions"
              >
                <ThreeDotsIcon />
              </button>

              <ActionsDropdown
                actions={actionsToUse}
                row={row.original}
                isOpen={isDropdownOpen}
                onClose={() => {
                  setOpenDropdownId(null);
                  setDropdownPosition(null);
                }}
                position={shouldUseRowClickForActions ? dropdownPosition : null}
              />
            </div>
          );
        },
        enableSorting: false,
      });
    }

    return formattedColumns;
  }, [
    currentTab.actions,
    currentTab.enableMultiSelect,
    currentTab.columns,
    currentTab.tableKey,
    currentTab.idKey,
    allSelected,
    deselectAll,
    visibleIds,
    selectAll,
    isSelected,
    toggleSelection,
    openDropdownId,
    dropdownPosition,
  ]);

  const table = useReactTable({
    data: currentTab.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const mobileCards = useMobileCardData({
    data: currentTab.data,
    columns: currentTab.columns,
    titleKey: currentTab.columns[0]?.key,
    subtitleKey: currentTab.columns[1]?.key,
  });

  return (
    <div className="w-full flex flex-col rounded-[8.3px] mb-[40px]">
      <TableFilters
        {...currentTab.tableFilters}
        tabs={allTabs.map((tab) => tab.tableFilters)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {isMaxMd ? (
        <>
          {/* Mobile Table */}
          <div className="flex flex-col gap-[24px]">
            {mobileCards.map((mobileCard, index) => {
              const rowId = mobileCard.raw[currentTab.idKey];
              const isDropdownOpen = openDropdownId === rowId;

              return (
                <div key={index} className="flex flex-col gap-[24px]">
                  {/* Actions button */}
                  {currentTab.actions?.length > 0 && (
                    <div className=" flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(isDropdownOpen ? null : rowId);
                          setDropdownPosition(getDropdownPosition(e));
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors rotate-90"
                      >
                        <ThreeDotsIcon />
                      </button>
                    </div>
                  )}

                  {/* Actions dropdown */}
                  <ActionsDropdown
                    actions={currentTab.actions}
                    row={mobileCard.raw}
                    isOpen={isDropdownOpen}
                    onClose={() => {
                      setOpenDropdownId(null);
                      setDropdownPosition(null);
                    }}
                    position={dropdownPosition}
                  />

                  {/* mobile card */}
                  <div className="flex flex-col gap-[13px] relative">
                    {/* Row fields */}
                    {mobileCard.fields.map((field, idx) => (
                      <div className="flex w-full justify-between" key={idx}>
                        <BodySix className="text-[#949CA9] font-[500]">
                          {field.label}
                        </BodySix>
                        <BodySix className="text-[#282828]">
                          {field.value}
                        </BodySix>
                      </div>
                    ))}
                  </div>

                  {/* Conditional separator */}
                  {index < mobileCards.length - 1 && (
                    <Separator color="#E8E9EA" />
                  )}
                </div>
              );
            })}
            {currentTab.tableFilters.addCta && (
              <div className="flex justify-end mt-[10px] mb-[20px]">
                <Button
                  onClick={currentTab.tableFilters.onCtaClick}
                  className="flex items-center gap-[10px] rounded-[30px] px-[18px] py-[8px] bg-primary hover:bg-primary/90 relative top-[10px]"
                >
                  {currentTab.tableFilters.ctaLogo}
                  <BodySix>
                    {currentTab.tableFilters.ctaLabel || "Create New"}
                  </BodySix>
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="w-full overflow-x-auto border-[1.33px] rounded-[14px] border-[#27272A80]">
            <table className="w-full">
              <thead className="bg-[#18181BB2]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b-[1.33px] border-[#27272A80] h-[52px]"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left h-[48px] px-[24px] py-[16px] whitespace-nowrap min-w-[100px]"
                      >
                        <span className="text-[#9F9FA9] font-[600] text-[14px]">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                <AnimatePresence>
                  {currentTab.paginationProps?.isLoading ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td colSpan={columns.length} className="text-center py-6">
                        <ClipLoader size={30} color="#147A66" />
                      </td>
                    </motion.tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`border-t-[1.33px] border-[#27272A4D] hover:bg-[#27272A]/5 ${
                          !hasMultipleActions ? "cursor-pointer" : ""
                        }`}
                        onClick={(e) => handleRowClick(e, row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="h-[65px] px-[24px] py-[16px] whitespace-nowrap"
                          >
                            <div className="text-white text-[14px]">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      )}

      {currentTab.paginationProps && (
        <div className="mt-4">
          <Pagination {...currentTab.paginationProps} />
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
