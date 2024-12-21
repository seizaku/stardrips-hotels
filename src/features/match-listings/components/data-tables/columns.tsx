"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { tableFilterFn } from "~/lib/table";
import { type SheetListings } from "~/server/api/routers/match-listings/router";
import { MatchButton } from "../match-button";

export const columns: ColumnDef<SheetListings>[] = [
  {
    accessorKey: "match",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell, row }) => <MatchButton id={row.getValue("hotel_name")} value={Boolean(cell.getValue())} />,
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "hotel_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sheet Hotel Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        City
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        City
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "chains_and_brands",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Chains & Brands
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "group_type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Group Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "group_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Group Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
];
