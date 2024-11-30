/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Row } from "@tanstack/react-table";

export const tableFilterFn = (
  row: Row<any>,
  columnId: string,
  filterValue: string,
) => {
  const rowValue = row.getValue(columnId);

  // Perform case-insensitive partial matching
  return rowValue !== undefined
    ? String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())
    : false;
};
