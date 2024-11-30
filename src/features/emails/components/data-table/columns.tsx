"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import { Button } from "~/components/ui/button";
import { tableFilterFn } from "~/lib/table";
import { type Email } from "~/server/api/routers/emails/router";

export const columns: ColumnDef<Email>[] = [
  {
    accessorKey: "threadId",
  },
  {
    accessorKey: "messageId",
  },
  {
    accessorKey: "body",
  },
  {
    accessorKey: "hotel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hotel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 150,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "email_per_property",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unique Emails
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "date.value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <>{moment(cell.getValue() as string).format("YYYY-MM-DD")}</>;
    },
    sortingFn: "alphanumeric",
    minSize: 150,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "snippet",
    header: () => {
      return (
        <Button variant="ghost">
          Snippet
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "promo_code",
    header: () => {
      return (
        <Button variant="ghost">
          Promo Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "start_date.value",
    header: () => {
      return (
        <Button variant="ghost">
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "end_date.value",
    header: () => {
      return (
        <Button variant="ghost">
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "Period",
    header: () => {
      return (
        <Button variant="ghost">
          Period
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "value",
    header: () => {
      return (
        <Button variant="ghost">
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "summary",
    header: () => {
      return (
        <Button variant="ghost">
          Summary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
];
