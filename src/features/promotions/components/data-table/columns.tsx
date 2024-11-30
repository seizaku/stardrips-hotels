"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { tableFilterFn } from "~/lib/table";
import moment from "moment";
import { ImageStore } from "~/features/promotions/stores/promo-store";
import { ImageModal } from "~/features/promotions/components/image-modal";
import { type Promotion } from "~/server/api/routers/promos/router";

export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: "threadId",
  },
  {
    accessorKey: "messageId",
  },
  {
    accessorKey: "date.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email Received
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <>{moment(cell.getValue<string>()).format("YYYY-MM-DD")}</>
    ),
    sortingFn: "alphanumeric",
    minSize: 150,
  },
  {
    accessorKey: "body",
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
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 150,
  },
  {
    accessorKey: "promo_code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Promo Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "start_date.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <>{moment(cell.getValue<string>()).format("YYYY-MM-DD")}</>
    ),
    sortingFn: "alphanumeric",
    minSize: 150,
  },
  {
    accessorKey: "end_date.value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        End Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <>{moment(cell.getValue<string>()).format("YYYY-MM-DD")}</>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 150,
  },
  {
    accessorKey: "period",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Period
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 200,
  },
  {
    accessorKey: "value",
    header: () => (
      <Button variant="ghost">
        Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "auto",
    filterFn: tableFilterFn,
    minSize: 250,
  },
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Summary
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "datetime",
    filterFn: tableFilterFn,
    minSize: 500,
  },
  {
    accessorKey: "email",
    header: () => <Button variant="ghost">Action</Button>,
    cell: ({ row }) => {
      const { selectImage, deselect, data, setLoading } = ImageStore();

      async function showImage() {
        deselect();
        setLoading(true);
        const threadId: string = row.getValue("threadId");
        const messageId: string = row.getValue("messageId");
        const key = `${threadId}.${messageId}`;

        if (key in data) {
          selectImage(threadId, messageId);
        } else {
          selectImage(threadId, messageId, "");
        }
        setLoading(false);
      }

      return (
        <ImageModal>
          <Button onClick={showImage} variant={"secondary"}>
            View Image
          </Button>
        </ImageModal>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 200,
  },
];
