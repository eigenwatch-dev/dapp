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
// import { EyeIcon } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { ThreeDotsIcon } from "./components/ThreeDotsIcon";
import { ActionsDropdown } from "./components/ActionsDropdown";
import { TableDrawer } from "./components/TableDrawer";
import { useTableTabs } from "./hooks/useTableTabs";
import { useTableActions } from "./hooks/useTableActions";
import Pagination, { PaginationProps } from "./components/Pagination";
import TableFilters, { TableFiltersProps } from "./components/TableFilters";
import { getDropdownPosition } from "./utils/tableUtils";
import { Checkbox } from "@/components/ui/checkbox";
import useSelectionStore from "@/hooks/store/useSelect";
import BodySix from "@/components/typography/BodySix";
import { useBreakpoint } from "@/hooks/ui/useBreakpoints";
import { useMobileCardData } from "./components/useMobileCardData";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export type TableAction = {
  label: string;
  handler: (config: {
    openDrawer: () => void;
    data?: Record<string, any>;
  }) => void;
  className?: string;
  icon?: React.ReactNode;
};

export type ReusableTableProps = {
  columns: { key: string; displayName: string }[];
  data: Record<string, any>[];
  tableFilters: TableFiltersProps;
  actions?: TableAction[];
  idKey?: string;
  tableKey?: string;
  paginationProps?: PaginationProps;
  enableMultiSelect?: boolean;
  rawData?: Record<string, any>[][];
  drawerContent?: (selectedRow: any) => React.ReactNode;
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
  drawerContent,
  onRowClick,
  rawData,
}: ReusableTableProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
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
    drawerContent,
    onRowClick,
    rawData,
    altTabs,
    activeTab,
  });

  const { handleRowClick } = useTableActions({
    currentTab,
    setSelectedRow,
    setOpenDrawer,
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
    const shouldUseRowClickForActions = hasActions && !currentTab.drawerContent;

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
        : [
            {
              id: "s/n",
              header: () => "S/N",
              cell: ({ row }: { row: any }) => {
                const index = row.index;
                const pageNumber =
                  currentTab.paginationProps?.pagination.page || 1;
                const pageSize =
                  currentTab.paginationProps?.pagination.limit || 10;
                const serialNumber = (pageNumber - 1) * pageSize + index + 1;
                return serialNumber;
              },
            },
          ]),

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
                openDrawer={() => {
                  setSelectedRow(row);
                  setOpenDrawer(true);
                }}
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
    currentTab.drawerContent,
    currentTab.enableMultiSelect,
    currentTab.columns,
    currentTab.tableKey,
    currentTab.idKey,
    currentTab.paginationProps?.pagination.page,
    currentTab.paginationProps?.pagination.limit,
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

  console.log({ mobileCards });

  return (
    <div className="w-full flex flex-col bg-white rounded-[8.3px] p-[20px] max-md:p-[3px] mb-[40px]">
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
                    openDrawer={() => {
                      setSelectedRow(mobileCard.raw);
                      setOpenDrawer(true);
                    }}
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
          <div className="w-full overflow-x-auto">
            <table className="w-full border-y border-[#E8E9EA]">
              <thead className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left h-[48px] px-1 whitespace-nowrap"
                      >
                        <BodySix className="font-[500] text-[#949CA9]">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </BodySix>
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
                        className={`border-t border-[#E8E9EA] hover:bg-slate-100 ${
                          currentTab.drawerContent && !hasMultipleActions
                            ? "cursor-pointer"
                            : ""
                        }`}
                        onClick={(e) => handleRowClick(e, row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="h-[48px] px-1 whitespace-nowrap"
                          >
                            <BodySix className="text-[#282828]">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </BodySix>
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

      <TableDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentTab={currentTab}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default ReusableTable;
