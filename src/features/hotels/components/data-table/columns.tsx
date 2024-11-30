"use client";

import { type ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellEdit } from "~/features/hotels/components/cell-edit";
import { tableFilterFn } from "~/lib/table";
import { type Hotel } from "~/server/api/routers/hotels/router";

export const columns: ColumnDef<Hotel>[] = [
  {
    accessorKey: "is_valid_hotel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valid Hotel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row, column, cell, table }) => (
      <CellEdit
        initialValue={cell.getValue() as boolean}
        row={row}
        column={column}
        table={table}
        input="checkbox"
      />
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 80,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Emails Signed Up
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value: string[] = row.getValue("to");

      return (
        <ul>
          {value.map((item) => (
            <li key={item}>{item.replace("@gmail.com", "")}</li>
          ))}
        </ul>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Emails Signed Up Count
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const emails: string[] = row.getValue("to");
      return <p>{emails.length}</p>;
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "domain",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Domain
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell, row, column, table }) => (
      <CellEdit
        initialValue={cell.getValue() as string}
        row={row}
        column={column}
        table={table}
        input="text"
      />
    ),
    sortingFn: "alphanumeric",
    minSize: 200,
  },
  {
    accessorKey: "hotel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hotel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell, row, column, table }) => (
      <CellEdit
        initialValue={cell.getValue() as string}
        row={row}
        column={column}
        table={table}
        input="text"
      />
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "total_emails",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Emails
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "first_email.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <>{moment(cell.getValue() as string).format("YYYY-MM-DD")}</>
    ),
    sortingFn: "datetime",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "last_email.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <>{moment(cell.getValue() as string).format("YYYY-MM-DD")}</>
    ),
    sortingFn: "datetime",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "avg_time_between_emails",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Average Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p>{row.original.avg_time_between_emails?.toFixed(1) || 0} days</p>
    ),
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "last_updated.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Updated
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
];
