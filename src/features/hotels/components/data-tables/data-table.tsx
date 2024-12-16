"use client";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ColumnResize } from "~/components/table/column-resize";
import { useState } from "react";
import { type HotelProperties } from "~/server/api/routers/hotels/router";
import { SearchDataTable } from "~/components/search-datatable";
import { PaginationDataTable } from "~/components/pagination-datatable";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "~/components/ui/dropdown-menu";
import { Columns2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";

interface DataTable {
  columns: ColumnDef<HotelProperties>[];
  data: HotelProperties[];
  maxSize: number;
}

const DataTable = ({ columns, data, maxSize }: DataTable) => {
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    body: false,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColSizing,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      columnSizing: colSizing,
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-medium">Hotels & Properties</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        {maxSize} total rows.
      </p>
      <p className="max-w-2xl text-sm">
        {`This table displays each individual hotel or hotel group from the various emails received, along with their properties, either via automated or manual matching.`}{" "}
      </p>

      <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchDataTable />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
              >
                <Columns2Icon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table style={{ minWidth: "100%", tableLayout: "fixed" }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative bg-background"
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      <ColumnResize header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="px-6"
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="px-6"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationDataTable maxSize={maxSize} />
    </div>
  );
};

export { DataTable };
