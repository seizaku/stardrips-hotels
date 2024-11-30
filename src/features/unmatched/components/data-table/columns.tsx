import { type ColumnDef } from "@tanstack/react-table";
import { type UnmatchedListing } from "~/server/api/routers/unmatched-listings/router";

export const columns: ColumnDef<UnmatchedListing>[] = [
  {
    accessorKey: "hotel_name",
    minSize: 400,
  },
  {
    accessorKey: "city",
  },
  {
    accessorKey: "country",
  },
  {
    accessorKey: "group_type",
  },
  {
    accessorKey: "group_name",
  },
  {
    accessorKey: "email_subscribed",
  },
];
