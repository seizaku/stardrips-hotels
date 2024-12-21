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
    minSize: 500,
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
        Email Subscribed
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
];
