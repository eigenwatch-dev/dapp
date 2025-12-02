import { useMemo } from "react";
import { ReusableTableProps } from "../ReuseableTable";

type UseTableTabsProps = {
  userColumns: ReusableTableProps["columns"];
  data: ReusableTableProps["data"];
  actions: ReusableTableProps["actions"];
  idKey: string;
  tableKey: string;
  paginationProps: ReusableTableProps["paginationProps"];
  tableFilters: ReusableTableProps["tableFilters"];
  enableMultiSelect: ReusableTableProps["enableMultiSelect"];
  onRowClick: ReusableTableProps["onRowClick"];
  rawData: ReusableTableProps["rawData"];
  altTabs: ReusableTableProps["altTabs"];
  activeTab: number;
};

export type CurrentTab = Omit<ReusableTableProps, "altTabs"> &
  Required<Pick<ReusableTableProps, "idKey" | "tableKey" | "actions">>;

export const useTableTabs = ({
  userColumns,
  data,
  actions = [],
  idKey,
  tableKey,
  paginationProps,
  tableFilters,
  enableMultiSelect,
  onRowClick,
  rawData,
  altTabs = [],
  activeTab,
}: UseTableTabsProps) => {
  const allTabs = useMemo(
    () => [
      {
        columns: userColumns,
        data,
        actions,
        idKey,
        tableKey,
        paginationProps,
        tableFilters,
        enableMultiSelect,
        onRowClick,
        rawData,
      },
      ...altTabs,
    ],
    [
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
    ]
  );

  const currentTab: CurrentTab = useMemo(() => {
    const tab = allTabs[activeTab];
    return {
      ...tab,
      actions: tab.actions || [],
      idKey: tab.idKey || "id",
      tableKey: tab.tableKey || `default-table_${activeTab}`,
    };
  }, [allTabs, activeTab]);

  return { currentTab, allTabs };
};
