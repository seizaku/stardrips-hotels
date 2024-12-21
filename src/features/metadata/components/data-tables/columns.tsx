"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { tableFilterFn } from "~/lib/table";
import { type Metadata } from "~/server/api/routers/metadata/router";
import { ImageCarousel } from "../image-carousel";
import { Badge } from "~/components/ui/badge";

export const columns: ColumnDef<Metadata>[] = [
  {
    accessorKey: "photo_gallery",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Photo Gallery
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => <ImageCarousel images={cell.getValue() as string[]} />,
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
        BQHotel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 400
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Booking.com Label
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 400,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 300,
  },
  {
    accessorKey: "property_highlights",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Property Highlights
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => (
      <div className="flex gap-2 flex-wrap">
        {(cell.getValue() as string[])
          .map((item, index) => (
            <Button variant="outline" key={`${item}-${index}`}>
              {item}
            </Button>
          ))}
      </div>
    ),
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 500,
  },
  {
    accessorKey: "roomTypes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room Types
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => {
      const roomTypes = (cell.getValue() as Metadata["roomTypes"]) || [];

      // Remove duplicates based on the `type` property
      const uniqueRoomTypes = Array.from(
        new Map(roomTypes.map((item) => [item.type, item])).values()
      );

      return (
        <div className="flex gap-2 flex-wrap">
          {uniqueRoomTypes?.map((item, index) => (
            <Button variant="outline" key={`${item?.type}-${index}`}>
              {item?.type} {Boolean(item?.maxGuests) && <Badge>{item.maxGuests?.toString()?.[0]}</Badge>}
            </Button>
          ))}
        </div>
      );
    },
    sortingFn: "alphanumeric",
    filterFn: tableFilterFn,
    minSize: 1000,
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
    minSize: 100,
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
    minSize: 100,
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
