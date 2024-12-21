"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { tableFilterFn } from "~/lib/table";
import { type Email } from "~/server/api/routers/emails/router";

export const columns: ColumnDef<Email>[] = [
  {
    accessorKey: "threadId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ThreadID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200
  },
  {
    accessorKey: "messageId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        MessageID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "hotel_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        GSheet Hotel Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
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
    minSize: 200,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "from",
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
    accessorKey: "subject",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Subject
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "snippet",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Snippet
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 500,
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Subscriber
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 500,
  },
  {
    accessorKey: "body",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Body
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 1000,
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
    minSize: 200,
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
    minSize: 200,
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
    minSize: 200,
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Website
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "adr",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ADR
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 50,
  },
  {
    accessorKey: "review_score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Review Score
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 50,
  },
  {
    accessorKey: "star_rating",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Star Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 50,
  },
  {
    accessorKey: "rooms",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rooms
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 50,
  },
];
