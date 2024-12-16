"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { tableFilterFn } from "~/lib/table";
import { type HotelProperties } from "~/server/api/routers/hotels/router";

export const columns: ColumnDef<HotelProperties>[] = [
  {
    accessorKey: "hotel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        BQHotel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 400
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
    minSize: 300,
  },
  {
    accessorKey: "properties",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Properties
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <div className="flex gap-2 flex-wrap">
        {(cell.getValue() as string)
          ?.split("\t")
          .filter(item => item.trim().length)
          .map((item, index) => (
            <Button variant="outline" key={`${item}-${index}`}>
              {item}
            </Button>
          ))}
      </div>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 1000,
  },
];
