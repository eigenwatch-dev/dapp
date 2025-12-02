/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useMobileCardData.ts
import { useMemo } from "react";
import { tableToCardData } from "../utils/tableUtils";

export function useMobileCardData({
  data,
  columns,
  idKey = "id",
  titleKey,
  subtitleKey,
}: {
  data: Record<string, any>[];
  columns: { key: string; displayName: string }[];
  idKey?: string;
  titleKey?: string;
  subtitleKey?: string;
}) {
  return useMemo(() => {
    return tableToCardData({ data, columns, idKey, titleKey, subtitleKey });
  }, [data, columns, idKey, titleKey, subtitleKey]);
}
