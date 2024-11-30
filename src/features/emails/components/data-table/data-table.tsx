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
import { useState } from "react";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Columns2Icon } from "lucide-react";
import { ColumnResize } from "~/components/table/column-resize";
import { type Email } from "~/server/api/routers/emails/router";
import { EmailStore } from "~/features/emails/stores/email-store";
import { DataTableSkeleton } from "~/components/table/table-skeleton";

export const DataTable = <TValue,>({
  columns,
  data,
  isLoading,
  numRows,
}: {
  columns: ColumnDef<Email, TValue>[];
  data: Email[];
  isLoading: boolean;
  numRows: number;
}) => {
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    threadId: false,
    messageId: false,
    body: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const { page, setPage } = EmailStore();
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 50, //default page size
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
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      columnSizing: colSizing,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-medium">Emails</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        {numRows || 0} total emails.
      </p>

      <p className="max-w-2xl text-sm">
        {`This table shows all emails from different hotels.`}
      </p>

      <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
        <div className="flex flex-col gap-2 sm:flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hidden w-full md:flex"
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
            {isLoading ? (
              <DataTableSkeleton
                columns={columns.length - Object.keys(columnVisibility).length}
              />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="px-6"></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex w-full max-w-lg items-center gap-2 text-sm text-muted-foreground">
          Page
          <Input
            min={1}
            type="number"
            className="w-16"
            value={page}
            onChange={async (e) => {
              const numeric_page = parseInt(e.currentTarget.value);
              setPage(numeric_page);
              setPagination((prev) => ({
                ...prev,
                pageIndex: numeric_page,
              }));
            }}
          />
          of {(numRows / 50).toFixed() + 1}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setPage(page - 1);
              table.previousPage();
            }}
            disabled={page - 1 == 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setPage(page + 1);
              table.nextPage();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
